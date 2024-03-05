const Lesson = require("../models/lesson");

async function create(moduleId, title) {
  try {
    const newCourse = await Lesson.create({ moduleId, title });
    return newCourse;
  } catch (err) {
    console.error("Error creating lesson:", err);
    throw err;
  }
}
async function remove(lessonId) {
  try {
    const deletedCount = await Lesson.destroy({ where: { lessonId } });
    return deletedCount;
  } catch (err) {
    console.error("Error removing lesson:", err);
    throw err;
  }
}
async function update(newDataObj) {
  try {
    const updatedLesson = await Lesson.update(newDataObj, {
      where: { lessonId: newDataObj.lessonId },
    });
    return updatedLesson;
  } catch (err) {
    console.error("Error updating lesson:", err);
    throw err;
  }
}
async function getAll() {
  try {
    const allLessons = await Lesson.findAll();
    return allLessons;
  } catch (err) {
    console.error("Error getting all lesson:", err);
    throw err;
  }
}
async function getLessonById(lessonId) {
  try {
    const lesson = await Lesson.findByPk(lessonId);
    return lesson;
  } catch (err) {
    console.error("Error getting course by moduleId:", err);
    throw err;
  }
}
async function getLessonsByModule(moduleId) {
  try {
    const lessons = await Lesson.findAll({ where: moduleId });
    return lessons;
  } catch (err) {
    console.error("Error getting lesson by Course:", err);
    throw err;
  }
}
lesson.exports = {
  create,
  remove,
  update,
  getAll,
  getLessonById,
  getLessonsByModule,
};
