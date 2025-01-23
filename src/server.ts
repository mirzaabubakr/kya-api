import http from "http";
require("dotenv").config();
const app = require("./app");

// Create an HTTP server using the Express app
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

// Start the server and listen on the specified port
server.listen(PORT, () => {
console.log(`Server running on port: ${PORT}`);
});