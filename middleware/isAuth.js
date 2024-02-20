require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    const error = new Error("Authorization header is missing");
    error.statusCode = 401;
    throw error;
  }
  const token = req.get("Authorization").split(" ")[1];

  var verified;
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) {
      const error = new Error("Not authenticated");
      error.statusCode = 401;
      throw error;
    }
    req.userId = verified.id;
    next();
  } catch (err) {
    err.statusCode = 500;
    next(err);
  }
};
