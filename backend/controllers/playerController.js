const Player = require('../models/Player');

// Create a new player
const createPlayer = (req, res) => {
  const { name, team, price, role } = req.body;

  Player.createPlayer(name, team, price, role, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Error creating player.' });
    }
    res.status(201).json({ message: 'Player created successfully.' });
  });
};

// Get all players
const getAllPlayers = (req, res) => {
  Player.getAllPlayers((err, players) => {
    if (err) {
      return res.status(500).json({ error: 'Error fetching players.' });
    }
    res.status(200).json(players);
  });
};

module.exports = {
  createPlayer,
  getAllPlayers,
};
