const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const Module = require("./module");

const Lesson = sequelize.define("lessons", {
  lessonId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  moduleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Module,
      key: "moduleId",
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
  isPublic: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  isBlocked: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Lesson;
