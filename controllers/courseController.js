require("dotenv").config();
const courseService = require("../services/courseService");

exports.createCourse = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { title, description, thumbnail } = req.body;

    if (!userId || !title || !description || !thumbnail) {
      return res.status(400).json({ message: "Missing required fields" });
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
    next(err);
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
      return res.status(400).json({ message: "Missing required fields" });
    }
    const newData = { title, description, thumbnail, isPublic };

    const updatedCourse = await courseService.update(courseId, newData);

    res
      .status(200)
      .json({ message: "Successful update!", course: updatedCourse });
  } catch (err) {
    next(err);
  }
};
exports.deleteCourse = async (req, res, next) => {
  try {
    const id = req.params.id;
    const userId = req.userId;
    if (!id) {
      res.status(400).json({ message: "misssing id field" });
    }

    const response = await courseService.remove(id, userId);
    console.log(response);
    res.status(200).json({ message: "successfully deleted course" });
  } catch (error) {
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
    next(err);
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
    next(err);
  }
};
exports.getCourseContent = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(400).json({ message: "missing id field" });
    }
    const content = await courseService.getCoursesContent(id);

    res
      .status(200)
      .json({ message: "successfully fetched your courses", content });
  } catch (err) {
    next(err);
  }
};
