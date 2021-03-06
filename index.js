#!/usr/bin/env node

require("dotenv").config();

/**
 * Module dependencies.
 */

const app = require("./app");
const debug = require("debug")("tanibisa-backend:server");
const http = require("http");

/**
 * Get host, port, database from environment and store in Express.
 */

const host = process.env.HOST || "localhost";
const port = normalizePort(process.env.PORT || "8000");
const database = process.env.MONGODB_URI || `mongodb://localhost:27017/db`;

app.set("port", port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);

  console.info(`
- https://github.com/tanibisa/tanibisa-backend
- REST API is listening on ${host}:${port}
- Database is on ${database}
`);
}
