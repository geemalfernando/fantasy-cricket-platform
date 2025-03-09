// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const db = require('../db/database');

// Verify token middleware
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token.' });
  }
};

// Check if user is admin
const isAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Authentication required.' });
  }

  const query = 'SELECT role FROM users WHERE id = ?';
  db.get(query, [req.user.id], (err, row) => {
    if (err) {
      return res.status(500).json({ message: 'Database error.' });
    }
    
    if (!row || row.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin privileges required.' });
    }
    
    next();
  });
};

module.exports = {
  verifyToken,
  isAdmin
};