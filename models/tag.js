// tags.js
const { DataTypes } = require("sequelize");
const sequelize = require("../util/database");

const Tag = sequelize.define("tags", {
  tag_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true,
  },
});

module.exports = Tag;
