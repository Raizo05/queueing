const express = require('express');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const userDB = require('./db_conn.js');
const metricsDB = require('./db_conn.js');

const server = express();
const port = 3000;

server.use(bodyParser.json()); // Parse JSON request bodies

// Route to register a new user
server.post('/register', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  // Hash the password
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ message: 'Error hashing password' });
    }

    // Insert the new user into the database
    db.run(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      [username, hashedPassword],
      function (err) {
        if (err) {
          return res.status(500).json({ message: 'Error saving user to database' });
        }
        return res.status(201).json({ message: 'User registered successfully', userId: this.lastID });
      }
    );
  });
});

// Route to login a user
server.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  // Retrieve the user's stored hashed password from the database
  db.get('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
    if (err) {
      return res.status(500).json({ message: 'Error retrieving user' });
    }

    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Compare the provided password with the stored hashed password
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ message: 'Error comparing passwords' });
      }

      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid username or password' });
      }

      // Successful login
      return res.status(200).json({ message: 'Login successful' });
    });
  });
});

// Start the server
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});