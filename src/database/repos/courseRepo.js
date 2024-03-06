const Course = require("../models/course");

async function create(userId, title, description, thumbnail) {
  try {
    const [course, created] = await Course.findOrCreate({
      where: { userId, title },
      defaults: {
        userId,
        title,
        description,
        thumbnail,
      },
    });
    return { course, created };
  } catch (err) {
    console.error("Error creating course:", err);
    throw err;
  }
}

async function remove(courseId, userId) {
  try {
    const deletedCourseCount = await Course.destroy({
      where: { courseId, userId },
    });
    return deletedCourseCount;
  } catch (err) {
    console.error("Error removing course:", err);
    throw err;
  }
}

async function update(newDataObj) {
  try {
    const updatedCourse = await Course.update(newDataObj, {
      where: { courseId: newDataObj.courseId },
    });
    return updatedCourse;
  } catch (err) {
    console.error("Error updating course:", err);
    throw err;
  }
}

async function getAll() {
  try {
    const allCourses = await Course.findAll();
    return allCourses;
  } catch (err) {
    console.error("Error getting all courses:", err);
    throw err;
  }
}

async function getCourseById(courseId) {
  try {
    const course = await Course.findByPk(courseId);
    return course;
  } catch (err) {
    console.error("Error getting course by courseId:", err);
    throw err;
  }
}
async function getCoursesByUser(userId) {
  try {
    const courses = await Course.findAll({ where: { userId } });
    return courses;
  } catch (err) {
    console.error("Error getting course by courseId:", err);
    throw err;
  }
}

module.exports = {
  create,
  remove,
  update,
  getAll,
  getCourseById,
  getCoursesByUser,
};
