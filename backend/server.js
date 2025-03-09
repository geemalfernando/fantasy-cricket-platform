const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const playerRoutes = require('./routes/playerRoutes');
const initializeDatabase = require('./db/init')

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:3000', // Frontend URL
  methods: ['GET', 'POST'],
};
app.use(cors({ origin: 'http://localhost:3000', credentials: true })); // Allow frontend to communicate
// Use the CORS middleware with the specified options

// Middleware
app.use(express.json());

// Database setup
const db = new sqlite3.Database('./database.sqlite', (err) => {
  if (err) {
    console.error('Failed to connect to the database.', err);
  } else {
    console.log('Connected to the database.');
  }
});

// Routes
app.use('/api/auth', authRoutes); // Correct path for authentication routes
app.use('/api/admin', adminRoutes);
app.use('/api/players', playerRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

initializeDatabase(); 

module.exports = db; // Export the db instance if needed in routes


// Initialize the database when the server starts
