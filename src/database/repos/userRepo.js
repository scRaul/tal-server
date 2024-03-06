const User = require("../models/user");
const bcrypt = require("bcryptjs");

function userDTO(user) {
  return { userId: user.userId, username: user.username, email: user.email };
}

async function create(username, password, email) {
  try {
    if (password.length < 6) {
      throw new Error("Password too short");
    }
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new Error("Email already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      password: hashedPassword,
      email,
    });
    return userDTO(newUser);
  } catch (err) {
    throw err;
  }
}

async function remove(userId) {
  try {
    const deletedUserCount = await User.destroy({
      where: { userId: userId },
    });
    return deletedUserCount;
  } catch (err) {
    console.error("Error removing user:", err);
    throw err;
  }
}

async function updateUsername(userId, newUsername) {
  try {
    const updatedUser = await User.update(
      { username: newUsername },
      { where: { userId } }
    );

    return userDTO(updatedUser);
  } catch (err) {
    console.error("Error updating username:", err);
    throw err;
  }
}
async function updatePassword(userId, newPassword) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedUser = await User.update(
      { password: hashedPassword },
      { where: { userId } }
    );
    return userDTO(updatedUser);
  } catch (err) {
    console.error("Error updating username:", err);
    throw err;
  }
}

async function verify(email, password) {
  try {
    const user = await User.findOne({
      attributes: ["userId", "password", "username"],
      where: { email },
    });
    if (!user) {
      throw new Error("Email not found");
    }
    const actualPassword = user.password;
    const isValid = await bcrypt.compare(password, actualPassword);
    if (isValid) {
      return { userId: user.userId, username: user.username };
    } else {
      return null;
    }
  } catch (err) {
    console.error("Error verifying credentials:", err);
    throw err;
  }
}
async function getAll() {
  try {
    const allUsers = await User.findAll({
      attributes: ["userId", "username", "email"],
    });
    return allUsers;
  } catch (err) {
    console.error("Error getting all users:", err);
    throw err;
  }
}
async function getByUserId(userId) {
  try {
    const user = await User.findByPk(userId);
    return userDTO(user);
  } catch (err) {
    console.error("Error getting user by userId:", err);
    throw err;
  }
}

async function getByEmail(email) {
  try {
    const user = await User.findOne({ where: { email: email } });
    return userDTO(user);
  } catch (err) {
    console.error("Error getting user by email:", err);
    throw err;
  }
}

async function getByUsername(username) {
  try {
    const users = await User.findAll({
      attributes: ["userId", "username", "email"],
      where: { username: username },
    });
    return users;
  } catch (err) {
    console.error("Error getting user by username:", err);
    throw err;
  }
}

module.exports = {
  create,
  remove,
  updatePassword,
  updateUsername,
  getAll,
  getByUserId,
  getByEmail,
  getByUsername,
  verify,
};
