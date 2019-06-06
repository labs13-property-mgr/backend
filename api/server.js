const express = require("express");
const configureMiddleware = require('./middleware/serverSetup');

const server = express();
configureMiddleware(server);

server.get("/", async (req, res) => {
  res.status(200).json({ message: "Server running...." });
});

module.exports = server