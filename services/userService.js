const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function signup(email, password, name) {
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new Error("Email already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email,
      password: hashedPassword,
      name,
    });
    return { id: newUser.id, email: newUser.email };
  } catch (err) {
    throw new Error("@Service.signup:" + err.message);
  }
}

async function login(email, password) {
  try {
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
  } catch (err) {
    throw new Error("@Service.login:" + err.message);
  }
}

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
