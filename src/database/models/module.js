const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Course = require("./course");

const Module = sequelize.define("modules", {
  moduleId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  courseId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Course,
      key: "courseId",
    },
  },
  title: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  index: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    autoIncrement: true,
  },
  isPublic: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  isBlocked: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Module;
