// Import the built-in http module
const http = require('http');
const sqlite3 = require('sqlite3').verbose();

// Define the request handler function
const requestHandler = (req, res) => {
  // Set the response header to indicate content type
  res.setHeader('Content-Type', 'text/plain');
  
  // Send a response message
  res.end('Hello, world!');
};

// Open a database in memory or on disk (it will create a new file if it doesn't exist)
const userDB = new sqlite3.Database('./db/users.sqlite', (err) => {
  if (err) {
    console.error('Error opening database', err);
  } else {
    console.log('Database created/opened successfully');
    
    // Optionally, you can create tables or insert data
    userDB.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT, age INTEGER)', (err) => {
      if (err) {
        console.error('Error creating table', err);
      } else {
        console.log('Table created');
      }
    });
  }
});

// Create an HTTP server and pass the request handler
const server = http.createServer(requestHandler);

// Define the port and hostname to listen on
const PORT = 3000;
const HOSTNAME = 'localhost';

// Start the server
server.listen(PORT, HOSTNAME, () => {
  console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});

// Close the database connection when done
// userDB.close((err) => {
//   if (err) {
//     console.error('Error closing the database', err);
//   } else {
//     console.log('Database connection closed');
//   }
// });