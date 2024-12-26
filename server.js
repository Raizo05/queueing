// Import the built-in http module
const http = require('http');

// Define the request handler function
const requestHandler = (req, res) => {
  // Set the response header to indicate content type
  res.setHeader('Content-Type', 'text/plain');
  
  // Send a response message
  res.end('Hello, world!');
};

// Create an HTTP server and pass the request handler
const server = http.createServer(requestHandler);

// Define the port and hostname to listen on
const PORT = 3000;
const HOSTNAME = 'localhost';

// Start the server
server.listen(PORT, HOSTNAME, () => {
  console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});
