const jwt = require("jsonwebtoken");
const RefreshTokenRepo = require("../database/models/refreshTokens");

module.exports = async (req, res, next) => {
  let token = null;
  let refreshToken = false;

  try {
    if (req.cookies.authToken) {
      token = req.cookies.authToken;
    } else if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
      refreshToken = true;
    }

    if (!token) {
      const error = new Error("Unauthorized");
      error.statusCode = 401;
      throw error;
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) {
      const error = new Error("Not authenticated");
      error.statusCode = 401;
      throw error;
    }

    if (refreshToken) {
      const isValid = await RefreshTokenRepo.verify(token);
      if (!isValid) {
        const error = new Error("Invalid refresh token");
        error.statusCode = 401;
        throw error;
      }
      const authTokenObj = RefreshTokenRepo.generateAuthToken(verified.userId);
      const authOpt = {
        expires: authTokenObj.expires,
        httpOnly: true,
      };
      res.cookie("authToken", authTokenObj.token, authOpt);
    }

    req.userData = { userId: verified.userId };
    next();
  } catch (err) {
    // Handle the "socket hang up" error and respond appropriately
    if (err.code === "ECONNRESET") {
      res.status(500).send("Internal Server Error");
    } else {
      err.statusCode = err.statusCode || 500;
      next(err);
    }
  }
};
