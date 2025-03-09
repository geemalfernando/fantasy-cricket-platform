// user.js
const bcrypt = require('bcrypt');

// Function to create a new user
const createUser = (db, username, password, callback) => {
  // Hash password before saving
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return callback(err);
    }

    // Save user to SQLite database
    const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.run(query, [username, hashedPassword], function (err) {
      if (err) {
        return callback(err);
      }
      callback(null, { id: this.lastID, username });
    });
  });
};

// Function to find a user by username
const findUserByUsername = (db, username, callback) => {
  const query = 'SELECT * FROM users WHERE username = ?';
  db.get(query, [username], (err, row) => {
    if (err) {
      return callback(err);
    }
    callback(null, row);  // `row` will be the user object or null if not found
  });
};

// Function to find user by ID
const findUserById = (db, id, callback) => {
  const query = 'SELECT * FROM users WHERE id = ?';
  db.get(query, [id], (err, row) => {
    if (err) {
      return callback(err);
    }
    callback(null, row);  // `row` will be the user object or null if not found
  });
};

module.exports = {
  createUser,
  findUserByUsername,
  findUserById,
};
