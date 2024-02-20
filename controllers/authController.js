require("dotenv").config();
const userService = require("../services/userService");

exports.signup = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      return res.status(400).json({ message: "One or more fields is missing" });
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
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "One or more required fields are missig" });
    }
    const userResponse = await userService.login(email, password);

    res.status(202).json({
      message: "User logged in successfully",
      token: userResponse.token,
      user: userResponse.user,
    });
  } catch (error) {
    next(error);
  }
};
