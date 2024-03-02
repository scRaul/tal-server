const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const RefreshToken = require("../models/refreshTokens.js");

/**
 * Creates login credentials for a user
 *
 * @param {string} email
 * @param {string} password -
 * @param {string} username -
 * @returns {Promis<{userId:string,email:string}>}
 * @throws {Error} if email already taken or error with database
 */
async function signup(email, password, username) {
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new Error("Email already exists, please use a different one.");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email,
      password: hashedPassword,
      username,
    });
    return { userId: newUser.id, email: newUser.email };
  } catch (err) {
    throw err;
  }
}
/**
 * Logs in a user with the provided email and password.
 *
 * @param {string} email - The email address of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<{authToken:{token:string,expires:Date}, refreshToken:{token:string,expires:Date}, userId: string}>} An object containing authentication tokens and user ID.
 * @throws {Error} If the user is not found or the credentials are invalid.
 */
async function login(email, password) {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error("User not found");
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error("invalid credentials.");
    }
    const authTokenObj = generateAuthToken(user.userId);
    const refreshTokenObj = await generateRreshToken(user.userId);

    return { authTokenObj, refreshTokenObj, userId: user.userId };
  } catch (err) {
    throw err;
  }
}
/** create jwt token,return to user
 *
 * @param {string} userId
 * @returns {token:string,expires:Date}
 */
function generateAuthToken(userId) {
  const payload = { userId };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2h" });
  const expires = new Date(Date.now() + 2 * 60 * 60 * 1000); //date 2 hours from now
  return { token, expires };
}
/** create jwt token, save to database, return to user
 *
 * @param {string} userId
 * @returns {Promise<{token:string,expires:Date}>}
 * @throw 500
 */
async function generateRreshToken(userId) {
  const payload = { userId };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // date 7 days from now
  try {
    const data = { token, userId, expiresIn: expires };
    const entry = await RefreshToken.create(data);
    return { token, expires };
  } catch (err) {
    throw err;
  }
}
