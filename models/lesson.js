const { DataTypes } = require("sequelize");
const sequelize = require("../util/database");
const Course = require("./course");
const Module = require("./module");

const Lesson = sequelize.define("lessons", {
  lesson_id: {
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
  module_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Module,
      key: "module_id",
    },
  },
  title: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
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

module.exports = Lesson;
