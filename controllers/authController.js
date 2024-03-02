const authService = require("../services/authService");
/**
 * sign up request
 *
 * @param {*} req - expected fields email, password, username
 * @param {*} res
 * @param {*} next
 * @returns {Promise<{message:string,user:<{userId:string,email:string}>}>}
 * @throws {Error} - missig fields, password length or 500
 */
exports.signup = async (req, res, next) => {
  try {
    const { email, password, username } = req.body;
    if (!email || !password || !username) {
      const error = new Error("Missing required fields");
      error.statusCode = 400;
      throw error;
    }
    if (password.length < 6) {
      const error = new Error("Password too short.");
      error.statusCode = 422;
      throw error;
    }
    const user = await userService.signup(email, password, username); //returns {userId,email}
    res.status(201).json({ message: "User created successfully", user });
  } catch (err) {
    next(err);
  }
};
/**
 * log in request
 *
 * @param {*} req - expected fields email and password
 * @param {*} res
 * @param {*} next
 * @return
 */
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      const error = new Error("Missing required fields");
      error.statusCode = 400;
      throw error;
    }
    const response = await userService.login(email, password);

    const authTokenObj = response.authTokenObj; //{token:string,expires:Date}
    const refreshTokenObj = response.refreshTokenObj; //{token:string,expires:Date}
    const userId = response.userId;

    const authOpt = {
      expires: authTokenObj.expires,
      httpOnly: true,
    };
    const refreshOpt = {
      expires: refreshTokenObj.expires,
      httpOnly: true,
    };
    const userOpt = {
      expires: refreshTokenObj.expires,
      httpOnly: true,
    };

    res.cookie("authToken", authTokenObj.token, authOpt);
    res.cookie("refreshToken", refreshTokenObj.token, refreshOpt);
    res.cookie("userId", userId, userOpt);
    res.status(200).send("successfully logged in");
    //if fails, send as json
  } catch (err) {
    next(err);
  }
};
