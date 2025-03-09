const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db/database'); // Import the db instance
const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
  console.log('📝 Received signup request:', req.body); // Debugging log
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }
  
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], function(err) {
      if (err) {
        return res.status(500).json({ error: 'Failed to register user' });
      }
      res.status(201).json({ message: 'User registered successfully' });
    });
  } catch (err) {
    res.status(500).json({ error: 'Error during registration' });
  }
});

// Login route
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  console.log('Login attempt:', username);

  db.get('SELECT * FROM users WHERE username = ?', [username], async (err, user) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Failed to log in' });
    }
    if (!user || !(await bcrypt.compare(password, user.password))) {
      console.log('Invalid credentials for:', username);
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    console.log('JWT_SECRET:', process.env.JWT_SECRET);
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log(token);
    
    res.json({ 
        token, 
        user: { id: user.id, username: user.username } 
      });
      
  });
});

module.exports = router;
