require("dotenv").config();
const express = require("express");
const server = express();

const userRoute = require("./routes/userRoute");
const studioRoute = require("./routes/studioRoute");

//DATA BASE ----
const sequelize = require("./util/database");
const User = require("./models/user");
const Course = require("./models/course");
const Module = require("./models/module");
const Lesson = require("./models/lesson");
const Tag = require("./models/tag");
// Define Relationships
User.hasMany(Course, { foreignKey: "user_id" });
Course.belongsTo(User, { foreignKey: "creator_id" });

Course.hasMany(Module, { foreignKey: "course_id" });
Module.belongsTo(Course, { foreignKey: "course_id" });

Module.hasMany(Lesson, { foreignKey: "module_id" });
Lesson.belongsTo(Module, { foreignKey: "module_id" });

Course.belongsToMany(Tag, { through: "CourseTags" });
Tag.belongsToMany(Course, { through: "CourseTags" });

//CORS ---
server.use((req, res, next) => {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  // Handle preflight requests (OPTIONS)
  if (req.method === "OPTIONS") {
    return res.sendStatus(200); // Respond with a 200 status for preflight requests
  }
  // Continue processing for non-preflight requests
  next();
});

server.use("/users", userRoute);
server.use("/studio", studioRoute);

// catch and handle all errors
server.use((error, req, res, next) => {
  var message = error.message;
  if (error.name === "SequelizeValidationError") {
    message = "Fix the following fields: ";
    error.errors.forEach((element) => {
      message += element.path;
    });

    error.statusCode = 422;
  }
  const status = error.statusCode || 500;
  res.status(status).json({
    message: message,
  });
});

const port = process.env.PORT || 8080;

sequelize
  .sync()
  .then((result) => {
    console.log(result);

    server.listen(port, () => {
      console.log("listening on port ", port);
    });
  })
  .catch((err) => {
    console.log(err);
  });
