require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const sequelize = require("./database/database");

//DATA BASE ----
const User = require("./database/models/user");
const Course = require("./database/models/course");
const Module = require("./database/models/module");
const Lesson = require("./database/models/lesson");
const Tag = require("./database/models/tag");
const RefreshToken = require("./database/models/refreshTokens");
// Define Relationships
User.hasMany(Course, { foreignKey: "userId", onDelete: "CASCADE" });
Course.belongsTo(User, { foreignKey: "userId" });

User.hasMany(RefreshToken, { foreignKey: "userId" });

Course.hasMany(Module, { foreignKey: "courseId", onDelete: "CASCADE" });
Module.belongsTo(Course, { foreignKey: "courseId" });

Module.hasMany(Lesson, { foreignKey: "moduleId", onDelete: "CASCADE" });
Lesson.belongsTo(Module, { foreignKey: "moduleId" });

Course.belongsToMany(Tag, { through: "CourseTags" });
Tag.belongsToMany(Course, { through: "CourseTags" });

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
// Use logger middleware only if not in production

const logger = require("./middleware/logger");
app.use(logger);

//CORS handling
const cors = require("./middleware/cors");
app.use(cors);

//ROUTES
const authRoute = require("./routes/authRoute");
app.use("/authenticate", authRoute);

// const creatorRoute = require("./routes/creatorRoute");
// app.use("/studio", creatorRoute);

// const courseRoute = require("./routes/courseRoute");
// app.use("/course", courseRoute);

// const moduleRoute = require("./routes/moduleRoute");
// app.use("/module", moduleRoute);

app.get("/", (req, res, next) => {
  res.status(200).send("Hello");
});
//CATCH ALL ERRORS THROWN
const errorHandler = require("./middleware/errorHandler");
app.use(errorHandler);

//START SEVER
const port = process.env.PORT || 8080;
async function startServer() {
  try {
    await sequelize.sync();
    app.listen(port, () => {
      console.log("app started on port", port);
    });
  } catch (error) {
    console.error("Error syncing sequelize:", error);
  }
}
startServer();
