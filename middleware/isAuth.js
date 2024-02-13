require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.get("Authorization").split(" ")[1];

  var verified;
  try {
    verified = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
  if (!verified) {
    const error = new Error("Not authenticated");
    error.statusCode = 401;
    throw error;
  }
  req.userEmail = verifiedToken.userEmail;
  next();
};
