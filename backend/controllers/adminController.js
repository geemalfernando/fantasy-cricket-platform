const Player = require('../models/Player');

// Create or update a player
exports.createOrUpdatePlayer = async (req, res) => {
  const { name, category, points, price, stats } = req.body;

  try {
    let player = await Player.findOne({ name });

    if (player) {
      // Update existing player
      player.points = points;
      player.price = price;
      player.stats = stats;
      await player.save();
      return res.status(200).json(player);
    }

    // Create new player
    player = new Player({ name, category, points, price, stats });
    await player.save();
    res.status(201).json(player);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a player
exports.deletePlayer = async (req, res) => {
  const { playerId } = req.params;

  try {
    const player = await Player.findById(playerId);
    if (!player) return res.status(404).json({ message: "Player not found" });

    await player.remove();
    res.status(200).json({ message: "Player deleted" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Fetch all players
exports.getAllPlayers = async (req, res) => {
  try {
    const players = await Player.find();
    res.status(200).json(players);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
