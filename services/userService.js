const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function signup(email, password, name) {
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new Error("Email already exists");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ email, password: hashedPassword, name });
  return { id: newUser.id, email: newUser.email };
}

async function login(email, password) {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error("User not found");
  }
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new Error("Incorrect password");
  }
  const token = jwt.sign(
    { id: user.userId, email: user.email },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
  return { token, user: { name: user.name, id: user.userId } };
}

async function getById(userId) {
  const user = await User.findByPk(userId);
  if (!user) {
    throw new Error("User not found");
  }
  return user;
}

async function getByEmail(email) {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error("User not found");
  }
  return user;
}

async function update(userId, newData) {
  const [rowsUpdated, [updatedUser]] = await User.update(newData, {
    where: { userId },
    returning: true,
  });
  if (rowsUpdated === 0) {
    throw new Error("User not found");
  }
  return updatedUser;
}

async function remove(userId) {
  const rowsDeleted = await User.destroy({ where: { userId } });
  if (rowsDeleted === 0) {
    throw new Error("User not found");
  }
  return "User deleted successfully";
}

module.exports = { signup, login, getById, getByEmail, update, remove };
