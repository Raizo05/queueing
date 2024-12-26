const sqlite3 = require('sqlite3').verbose();

// Open a database in memory or on disk (it will create a new file if it doesn't exist)
const db = new sqlite3.Database('./db/users.sqlite', (err) => {
  if (err) {
    console.error('Error opening database', err);
  } else {
    console.log('Database created/opened successfully');
    
    // Optionally, you can create tables or insert data
    db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT, age INTEGER)', (err) => {
      if (err) {
        console.error('Error creating table', err);
      } else {
        console.log('Table created');
      }
    });
  }
});

// Close the database connection when done
db.close((err) => {
  if (err) {
    console.error('Error closing the database', err);
  } else {
    console.log('Database connection closed');
  }
});
