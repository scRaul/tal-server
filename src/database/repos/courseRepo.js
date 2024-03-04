const Course = require("../models/course");

async function create(userId, title, description, thumbnail) {
  try {
    // Create a new course record in the database
    const newCourse = await Course.create({
      userId,
      title,
      description,
      thumbnail,
    });

    return newCourse;
  } catch (err) {
    console.error("Error creating course:", err);
    throw err;
  }
}

async function remove(courseId) {
  try {
    // Remove the course record from the database by courseId
    const deletedCourseCount = await Course.destroy({
      where: { courseId: courseId },
    });

    return deletedCourseCount; // Return the number of deleted records
  } catch (err) {
    console.error("Error removing course:", err);
    throw err;
  }
}

async function update(newDataObj) {
  try {
    // Update the course record in the database with newDataObj
    const updatedCourse = await Course.update(newDataObj, {
      where: { courseId: newDataObj.courseId },
    });

    return updatedCourse; // Return the updated course object
  } catch (err) {
    console.error("Error updating course:", err);
    throw err;
  }
}

async function getAll() {
  try {
    // Retrieve all course records from the database
    const allCourses = await Course.findAll();

    return allCourses; // Return an array of course objects
  } catch (err) {
    console.error("Error getting all courses:", err);
    throw err;
  }
}

async function getByCourseId(courseId) {
  try {
    // Retrieve a course record from the database by courseId
    const course = await Course.findByPk(courseId);

    return course; // Return the course object
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
  getByCourseId,
};
