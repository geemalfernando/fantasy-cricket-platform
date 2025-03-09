const sqlite3 = require('sqlite3').verbose();  // Import SQLite3 library

// Create and open a new SQLite database or connect to an existing one
const db = new sqlite3.Database('./fantasy-cricket.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    console.log(db);
  }
});

// Close the database connection when the server shuts down
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err.message);
    } else {
      console.log('Closed the database connection.');

    }
    process.exit(0);
  });
});

module.exports = db;
