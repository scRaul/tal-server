const CourseRepo = require("../database/repos/courseRepo");

exports.getCourses = async (req, res, next) => {
  try {
    const userId = req.userData.userId;
    const courses = await CourseRepo.getCoursesByUser(userId);
    res.status(200).json({ messsage: "Success", courses });
  } catch (err) {
    throw err;
  }
};
exports.getCourseById = async (req, res, next) => {
  try {
    const { courseId } = req.params.id;
    const course = await CourseRepo.getCourseById(courseId);
    res.status(200).json({ message: "Success", course });
  } catch (err) {
    throw err;
  }
};
exports.createCourse = async (req, res, next) => {
  try {
    const userId = req.userData.userId;
    const { title, description, thumbnail } = req.body;
    if (!userId || !title || !description || !thumbnail) {
      const error = new Error("Missing required fields");
      error.statusCode = 400;
      throw error;
    }
    const { course, created } = await CourseRepo.create(
      userId,
      title,
      description,
      thumbnail
    );
    const message = created ? "Success" : "Conflicting Title";
    res.status(200).json({ message, course });
  } catch (err) {
    throw err;
  }
};
exports.updateCourse = async (req, res, next) => {
  try {
    const userId = req.userData.userId;
    const courseId = req.params.id;
    const { title, description, thumbnail, isPublic } = req.body;
    if (
      !userId ||
      !title ||
      !description ||
      !thumbnail ||
      !isPublic ||
      !courseId
    ) {
      const error = new Error("Missing required fields");
      error.statusCode = 400;
      throw error;
    }
    const newData = {
      courseId,
      userId,
      title,
      description,
      thumbnail,
      isPublic,
    };

    const updatedCourse = await CourseRepo.update(newData);

    res.status(200).json({ message: "Successs", course: updatedCourse });
  } catch (err) {
    throw err;
  }
};
exports.removeCourse = async (req, res, next) => {
  try {
    const userId = req.userData.userId;
    const courseId = req.params.id;
    if (!userId || !courseId) {
      const error = new Error("Missing required fields");
      error.statusCode = 400;
      throw error;
    }
    const count = CourseRepo.remove(courseId, userId);
    const message = count == 0 ? "Failed to remove course" : "Success";
    res.status(200).json({ message });
  } catch (err) {
    throw err;
  }
};
exports.createModule = async (req, res, next) => {
  try {
  } catch (err) {
    throw err;
  }
};
exports.updateModule = async (req, res, next) => {
  try {
  } catch (err) {
    throw err;
  }
};
exports.deleteModule = async (req, res, next) => {
  try {
  } catch (err) {
    throw err;
  }
};
exports.createLesson = async (req, res, next) => {
  try {
  } catch (err) {
    throw err;
  }
};
exports.updateLesson = async (req, res, next) => {
  try {
  } catch (err) {
    throw err;
  }
};
exports.delete = async (req, res, next) => {
  try {
  } catch (err) {
    throw err;
  }
};
