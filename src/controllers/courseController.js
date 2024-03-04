require("dotenv").config();
const courseService = require("../services/courseService");

exports.createCourse = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { title, description, thumbnail } = req.body;

    if (!userId || !title || !description || !thumbnail) {
      const error = new Error("missing required fields");
      error.statusCode = 400;
      throw error;
    }
    const courseResponse = await courseService.create(
      userId,
      title,
      description,
      thumbnail
    );
    res
      .status(201)
      .json({ message: "Course created successfully", course: courseResponse });
  } catch (err) {
    const error = new Error("@Controller.createCourse:" + err.message);
    error.statusCode = err.statusCode || 500;
    next(error);
  }
};
exports.updateCourse = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { title, description, thumbnail, isPublic, courseId } = req.body;

    if (
      !userId ||
      !title ||
      !description ||
      !thumbnail ||
      !isPublic ||
      !courseId
    ) {
      const error = new Error("missing required fields");
      error.statusCode = 400;
      throw error;
    }
    const newData = { courseId, title, description, thumbnail, isPublic };

    const updatedCourse = await courseService.update(userId, newData);

    res
      .status(200)
      .json({ message: "Successful update!", course: updatedCourse });
  } catch (err) {
    const error = new Error("@Controller.updateCourse:" + err.message);
    error.statusCode = err.statusCode || 500;
    next(error);
  }
};
exports.deleteCourse = async (req, res, next) => {
  try {
    const id = req.params.id;
    const userId = req.userId;
    if (!id) {
      const error = new Error("missing required fields");
      error.statusCode = 400;
      throw error;
    }

    const response = await courseService.remove(id, userId);
    console.log(response);
    res.status(200).json({ message: "successfully deleted course" });
  } catch (err) {
    const error = new Error("@Controller.deleteCourse:" + err.message);
    error.statusCode = err.statusCode || 500;
    next(error);
  }
};
exports.getCreatorsCourses = async (req, res, next) => {
  try {
    const id = req.userId;

    const courses = await courseService.getByCreator(id);
    res
      .status(200)
      .json({ message: "successfully fetched your courses", courses });
  } catch (err) {
    const error = new Error("@Controller.getCreatorsCourse:" + err.message);
    error.statusCode = err.statusCode || 500;
    next(error);
  }
};
exports.getCourseById = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(400).json({ message: "missing id field" });
    }
    const course = await courseService.getById(id);
    res
      .status(200)
      .json({ message: "successfully fetched your courses", course });
  } catch (err) {
    const error = new Error("@Controller.getCourseById:" + err.message);
    error.statusCode = err.statusCode || 500;
    next(error);
  }
};
exports.getCourseContent = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) {
      const error = new Error("missing required fields");
      error.statusCode = 400;
      throw error;
    }
    const content = await courseService.getCoursesContent(id);

    res
      .status(200)
      .json({ message: "successfully fetched your courses", content });
  } catch (err) {
    const error = new Error("@Controller.getCourseContent:" + err.message);
    error.statusCode = err.statusCode || 500;
    next(error);
  }
};
