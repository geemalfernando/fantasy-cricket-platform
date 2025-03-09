// controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db/database');

// Register a new user
const register = (req, res) => {
  const { username, password, email, role = 'user' } = req.body;
  
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ message: 'Error hashing password' });
    }
    
    db.run(
      "INSERT INTO users (username, password, email, role) VALUES (?, ?, ?, ?)",
      [username, hashedPassword, email, role],
      function(err) {
        if (err) {
          // Check for duplicate username
          if (err.message.includes('UNIQUE constraint failed')) {
            return res.status(400).json({ message: 'Username already exists' });
          }
          return res.status(500).json({ message: err.message });
        }
        
        res.status(201).json({ message: 'User registered successfully' });
      }
    );
  });
};

// Login user
const login = (req, res) => {
  const { username, password } = req.body;
  
  db.get(
    "SELECT * FROM users WHERE username = ?",
    [username],
    (err, user) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      
      if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
      
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          return res.status(500).json({ message: 'Error comparing passwords' });
        }
        
        if (!isMatch) {
          return res.status(401).json({ message: 'Invalid username or password' });
        }
        
        // Create JWT token
        const token = jwt.sign(
          { id: user.id, username: user.username, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: '1h' }
        );
        
        // Return user info and token
        res.status(200).json({
          message: 'Login successful',
          token,
          user: {
            id: user.id,
            username: user.username,
            role: user.role
          }
        });
      });
    }
  );
};

module.exports = {
  register,
  login
};