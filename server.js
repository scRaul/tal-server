require("dotenv").config();
const express = require("express");

const server = express();

//CORS
server.use((req, res, next) => {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  // Handle preflight requests (OPTIONS)
  if (req.method === "OPTIONS") {
    return res.sendStatus(200); // Respond with a 200 status for preflight requests
  }
  // Continue processing for non-preflight requests
  next();
});

server.use("/", (req, res, next) => {
  res.status(200).send("Hello World");
});

// catch and handle all errors
server.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const errors = error.errors ? error.errors : [];
  res.status(status).json({
    message: message,
    errors: errors,
  });
});

const port = process.env.PORT || 8080;
server.listen(port, () => {
  console.log("listening on port ", port);
});
