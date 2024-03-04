const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const User = require("./user");

const RefreshToken = sequelize.define("refreshTokens", {
  refreshTokenId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  userId: {
    type: DataTypes.UUID,
    references: {
      model: User,
      key: "userId",
    },
    allowNull: false,
  },
  expiresIn: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

module.exports = RefreshToken;
