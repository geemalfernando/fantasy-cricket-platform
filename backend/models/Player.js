// player.js

// Function to create a new player
const createPlayer = (db, name, role, team, callback) => {
    const query = 'INSERT INTO players (name, role, team) VALUES (?, ?, ?)';
    db.run(query, [name, role, team], function (err) {
      if (err) {
        return callback(err);
      }
      callback(null, { id: this.lastID, name, role, team });
    });
  };
  
  // Function to get all players
  const getAllPlayers = (db, callback) => {
    const query = 'SELECT * FROM players';
    db.all(query, [], (err, rows) => {
      if (err) {
        return callback(err);
      }
      callback(null, rows);  // `rows` will be an array of players
    });
  };
  
  // Function to get a player by ID
  const getPlayerById = (db, id, callback) => {
    const query = 'SELECT * FROM players WHERE id = ?';
    db.get(query, [id], (err, row) => {
      if (err) {
        return callback(err);
      }
      callback(null, row);  // `row` will be the player object or null if not found
    });
  };
  
  // Function to update a player's details
  const updatePlayer = (db, id, name, role, team, callback) => {
    const query = 'UPDATE players SET name = ?, role = ?, team = ? WHERE id = ?';
    db.run(query, [name, role, team, id], function (err) {
      if (err) {
        return callback(err);
      }
      callback(null, { id, name, role, team });
    });
  };
  
  // Function to delete a player
  const deletePlayer = (db, id, callback) => {
    const query = 'DELETE FROM players WHERE id = ?';
    db.run(query, [id], function (err) {
      if (err) {
        return callback(err);
      }
      callback(null, { message: 'Player deleted' });
    });
  };
  
  module.exports = {
    createPlayer,
    getAllPlayers,
    getPlayerById,
    updatePlayer,
    deletePlayer,
  };
  