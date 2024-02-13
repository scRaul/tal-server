require("dotenv").config();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res, next) => {
  try {
    // Extract user input
    const { email, password, name } = req.body;

    //check to see all required fields are here
    if (!email || !password || !name) {
      const error = new Error("One or more required field is missing.");
      error.statusCode = 400;
      throw error;
    }

    if (password.length < 6) {
      const error = new Error("The password must be at least 6 characters");
      error.statusCode = 422;
      throw error;
    }

    //check if the current email beign used already exists in the database
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      const error = new Error("The email entered already exists");
      error.name = "email";
      error.statusCode = 409;
      throw error;
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await User.create({
      email,
      password: hashedPassword,
      name,
    });

    const userResponse = { id: newUser.id, email: newUser.email };

    // Send a success response
    res
      .statusCode(201)
      .json({ message: "User created successfully", user: userResponse });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    // Extract user input
    const { email, password } = req.body;

    //check to see all required fields are here
    if (!email || !password) {
      const error = new Error("One or more required field is missing.");
      error.statusCode = 400;
      throw error;
    }

    const existingUser = await User.findOne({ where: { email } });

    if (!existingUser) {
      const error = new Error("The email entered does not exist");
      error.name = "email";
      error.statusCode = 404;
      throw error;
    }
    const isValid = await bcrypt.compare(password, existingUser.password);

    if (!isValid) {
      const error = new Error("password did not match");
      error.statusCode = 401;
      throw error;
    }

    const userResponse = { id: existingUser.id, email: existingUser.email };

    const token = jwt.sign(userResponse, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(202).json({
      message: "User logged in successfully",
      token: token,
      userEmail: userResponse.email,
    });
  } catch (error) {
    next(error);
  }
};

exports.verified = async (req, res, next) => {
  res.status(202).json({ message: "authorization succesful" });
};
