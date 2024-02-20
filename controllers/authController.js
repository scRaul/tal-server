require("dotenv").config();
const userService = require("../services/userService");

exports.signup = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      const error = new Error("missing required fields");
      error.statusCode = 400;
      throw error;
    }
    if (password.length < 6) {
      return res
        .status(422)
        .json({ message: "The password must be at least 6 characters long" });
    }
    const userResponse = await userService.signup(email, password, name);
    res
      .status(201)
      .json({ message: "User created successfully", user: userResponse });
  } catch (err) {
    const error = new Error("@Controller.signup" + err.message);
    error.statusCode = err.statusCode || 500;
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      const error = new Error("missing required fields");
      error.statusCode = 400;
      throw error;
    }
    const userResponse = await userService.login(email, password);

    res.status(202).json({
      message: "User logged in successfully",
      token: userResponse.token,
      user: userResponse.user,
    });
  } catch (err) {
    const error = new Error("@Controller.login" + err.message);
    error.statusCode = err.statusCode || 500;
    next(error);
  }
};
