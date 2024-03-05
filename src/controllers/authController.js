const UserRepo = require("../database/repos/UserRepo");
const RefreshTokenRepo = require("../database/repos/refreshTokenRepo");
/**
 * request sign up
 * @param {*} req - expected fields email, password, username
 * @param {*} res - {message:string,user:{userId:string,email:string}}
 * @param {*} next- err
 */
exports.signup = async (req, res, next) => {
  try {
    const { email, password, username } = req.body;
    if (!email || !password || !username) {
      const error = new Error("Missing required fields");
      error.statusCode = 400;
      throw error;
    }
    const user = await UserRepo.create(username, password, email);
    res.status(201).json({ message: "User created successfully", user });
  } catch (err) {
    if (err.message.includes("Password")) err.statusCode = 400;
    if (err.message.includes("Email")) err.statusCode = 409;
    next(err);
  }
};
/**
 * request log in
 * @param {*} req - expected fields email and password
 * @param {*} res - cookies(authToken),{message:string,refreshToken:string,userId:string}
 * @param {*} next - err
 */
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      const error = new Error("Missing required fields");
      error.statusCode = 400;
      throw error;
    }
    const user = await UserRepo.verify(email, password);
    console.log(user);

    if (!user) {
      const error = new Error("wrong credintials");
      error.statusCode = 401;
      throw error;
    }
    const { authToken, refToken } = await RefreshTokenRepo.create(user.userId);

    const authOpt = {
      expires: authToken.expires,
      httpOnly: true,
    };

    res.cookie("authToken", authToken.token, authOpt);
    res.status(200).json({
      message: "successful log in",
      refreshToken: refToken,
      userId: user.userId,
    });
  } catch (err) {
    next(err);
  }
};
/**
 * request single client logout
 * @param {*} req -expected fields rfreshToken
 * @param {*} res -clear cookie, success message
 * @param {*} nexta err
 */
exports.logoutSingle = async (req, res, next) => {
  try {
    const refreshToken = req.body.rfreshToken;
    if (!refreshToken) {
      const error = new Error("Missing required fields");
      error.statusCode = 400;
      throw error;
    }
    await RefreshTokenRepo.removeToken(refreshToken);
    res.clearCookie("authToken");
    res.status(200).send("Logged out successfully");
  } catch (err) {
    next(err);
  }
};

/**
 * request log out from all clients
 * @param {*} req -expected fields none
 * @param {*} res -clear cookie, success message
 * @param {*} nexta err
 */
exports.logoutAll = async (req, res, next) => {
  try {
    const { userId } = req.userData;
    if (!userId) {
      const error = new Error("Unable to do so atm");
      error.statusCode = 400;
      throw error;
    }
    await RefreshTokenRepo.removeUser(userId);
    res.clearCookie("authToken");
    res.status(200).send("Logged out successfully");
  } catch (err) {
    next(err);
  }
};
