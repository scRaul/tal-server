const { DataTypes } = require("sequelize");
const sequelize = require("../util/database");
const User = require("./user");

const Course = sequelize.define("courses", {
  course_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  creator_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "user_id",
    },
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(500),
    allowNull: false,
  },
  thumbnail: {
    type: DataTypes.STRING(200),
  },
  published: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  date_created: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = Course;
