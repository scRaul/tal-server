const User = require("../models/user");
const bcrypt = require("bcryptjs");
/**
 * add a new user to database
 * @param {string} username
 * @param {string} password
 * @param {string} email
 * @returns {Promise<userDTO>}
 * @throws {Error} -if email alreay exists || password too short || 500
 */
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
    return { userId: newUser.userId, username, email };
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
      { where: { userId: newDataObj.userId } }
    );

    return;
  } catch (err) {
    console.error("Error updating username:", err);
    throw err;
  }
}
async function updatePassword(userId, newPassword) {
  try {
    const updatedUser = await User.update(
      { username: newUsername },
      { where: { userId: newDataObj.userId } }
    );
    return;
  } catch (err) {
    console.error("Error updating username:", err);
    throw err;
  }
}

async function getAll() {
  try {
    // Retrieve all user records from the database
    const allUsers = await User.findAll({
      attributes: ["userId", "username", "email"],
    });
    return allUsers;
  } catch (err) {
    console.error("Error getting all users:", err);
    throw err;
  }
}
// async function getByUserId(userId) {
//   try {
//     // Retrieve a user record from the database by userId
//     const user = await User.findByPk(userId);

//     return user; // Return the user object
//   } catch (err) {
//     console.error("Error getting user by userId:", err);
//     throw err;
//   }
// }

// async function getByEmail(email) {
//   try {
//     // Retrieve a user record from the database by email
//     const user = await User.findOne({ where: { email: email } });

//     return user; // Return the user object
//   } catch (err) {
//     console.error("Error getting user by email:", err);
//     throw err;
//   }
// }

// async function getByUsername(username) {
//   try {
//     // Retrieve user records from the database by username
//     const users = await User.findAll({ where: { username: username } });

//     return users; // Return an array of user objects
//   } catch (err) {
//     console.error("Error getting user by username:", err);
//     throw err;
//   }
// }

module.exports = {
  create,
  remove,
  update,
  getAll,
};
