const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const router = express.Router();

// Database connection
const db = new sqlite3.Database('./db/fantasy-cricket.db');

// Add a new player
router.post('/player', (req, res) => {
  const { name, category, points, price, runs, wickets, matches } = req.body;
  db.run(
    `INSERT INTO players (name, category, points, price, runs, wickets, matches) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [name, category, points, price, runs, wickets, matches],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ id: this.lastID, ...req.body });
    }
  );
});

// Get all players (for Admin)
router.get('/players', (req, res) => {
  db.all('SELECT * FROM players', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

module.exports = router;
