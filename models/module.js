const { DataTypes } = require("sequelize");
const sequelize = require("../util/database");
const Course = require("./course");

const Module = sequelize.define("modules", {
  module_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  course_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Course,
      key: "course_id",
    },
  },
  title: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  index: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  published: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Module;
