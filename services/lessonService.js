const Lesson = require("../models/lesson");
const crudService = require("../util/crudService");

async function create(moduleId, title, index) {
  try {
    const existingLesson = await Lesson.findOne({
      where: { title, moduleId },
    });
    if (existingLesson) {
      throw new Error("Lesson with the same title already exists");
    }
    const newLesson = await Lesson.create({
      moduleId,
      title,
      index,
      content: "begin typing here",
      published: false,
    });
    return newLesson;
  } catch (error) {
    throw new Error("Error creating lesson: " + error.message);
  }
}
async function update(lessonId, newData) {
  try {
    const lesson = await Lesson.findByPk(lessonId);
    if (!lesson) {
      throw new Error("lesson not found");
    }
    await lesson.update(newData);
    return lesson;
  } catch (error) {
    throw new Error("Error updating lesson: " + error.message);
  }
}
async function remove(lessonId) {
  try {
    const lesson = await Lesson.findByPk(lessonId);
    if (!lesson) {
      throw new Error("module not found");
    }
    await lesson.destroy();
    return "lesson deleted successfully";
  } catch (error) {
    throw new Error("Error deleting lesson: " + error.message);
  }
}

async function getByModule(moduleId) {
  try {
    const lessons = await Lesson.findAll({ where: { moduleId } });
    if (!lessons) {
      return [];
    }
    return lessons;
  } catch (error) {
    throw new Error("Error obtiaining modules");
  }
}

async function getById(id) {
  try {
    const lesson = await Lesson.findByPk(id);
    if (!lesson) {
      return [];
    }
    return lesson;
  } catch (error) {
    throw new Error("Error getting courses" + error.message);
  }
}
module.exports = {
  create,
  update,
  remove,
  getByModule,
  getById,
};
