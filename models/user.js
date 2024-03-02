const { DataTypes } = require("sequelize");
const sequelize = require("../util/database");

const User = sequelize.define("users", {
  userId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  permissionLevel: {
    type: DataTypes.ENUM("user", "mod", "admin"),
    allowNull: false,
    defaultValue: "user",
  },
  strikes: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

module.exports = User;
