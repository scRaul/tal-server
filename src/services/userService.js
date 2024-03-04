const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function getById(userId) {
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (err) {
    throw new Error("@Service.getById:" + err.message);
  }
}

async function getByEmail(email) {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (err) {
    throw new Error("@Service.getByEmail:" + err.message);
  }
}

async function update(userId, newData) {
  try {
    const [rowsUpdated, [updatedUser]] = await User.update(newData, {
      where: { userId },
      returning: true,
    });
    if (rowsUpdated === 0) {
      throw new Error("User not found");
    }
    return updatedUser;
  } catch (err) {
    throw new Error("@Service.update" + err.message);
  }
}

async function remove(userId) {
  try {
    const rowsDeleted = await User.destroy({ where: { userId } });
    if (rowsDeleted === 0) {
      throw new Error("User not found");
    }
    return "User deleted successfully";
  } catch (err) {
    throw new Error("@Services.remove:" + err.message);
  }
}

module.exports = { signup, login, getById, getByEmail, update, remove };
