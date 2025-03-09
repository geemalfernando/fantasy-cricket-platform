// db/init.js
const db = require('./database');

const initializeDatabase = () => {
  db.serialize(() => {
    // Updated users table with role field
    db.run(
      `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        email TEXT,
        role TEXT DEFAULT 'user' CHECK(role IN ('user', 'admin'))
      )`,
      function(err) {
        if (err) {
          console.error('Error creating users table:', err.message);
        } else {
          console.log('Users table created or already exists.');
          
          // Check if we have any admin user, create one if not
          db.get("SELECT COUNT(*) as count FROM users WHERE role = 'admin'", [], (err, row) => {
            if (err) {
              console.error('Error checking admin users:', err.message);
              return;
            }
            
            // If no admin users exist, create a default admin
            if (row.count === 0) {
              const bcrypt = require('bcrypt');
              bcrypt.hash('admin123', 10, (err, hash) => {
                if (err) {
                  console.error('Error creating default admin:', err.message);
                  return;
                }
                
                db.run(
                  "INSERT INTO users (username, password, email, role) VALUES (?, ?, ?, ?)",
                  ['admin', hash, 'admin@example.com', 'admin'],
                  function(err) {
                    if (err) {
                      console.error('Error creating default admin:', err.message);
                    } else {
                      console.log('Default admin user created. Username: admin, Password: admin123');
                    }
                  }
                );
              });
            }
          });
        }
      }
    );

    // Create players table
    db.run(
      `CREATE TABLE IF NOT EXISTS players (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        team TEXT NOT NULL,
        price INTEGER NOT NULL,
        role TEXT NOT NULL,
        points INTEGER DEFAULT 0
      )`,
      function(err) {
        if (err) {
          console.error('Error creating players table:', err.message);
        } else {
          console.log('Players table created or already exists.');
        }
      }
    );
  });
};

module.exports = initializeDatabase;