const Module = require("../models/module");
const Course = require("../models/course");

async function create(courseId, title) {
  try {
    const existingModule = await Module.findOne({
      where: { title, courseId },
    });
    if (existingModule) {
      throw new Error("Module with the same title already exists");
    }
    const index = await countModulesInCourse(courseId);
    const newModule = await Module.create({
      courseId,
      title,
      index,
      published: false,
    });
    return newModule;
  } catch (error) {
    throw new Error("@Service.create: " + error.message);
  }
}
async function update(userId, newData) {
  try {
    const mod = await Module.findByPk(newData.moduleId);
    if (!mod) {
      throw new Error("Mod not found");
    }

    await mod.update(newData);
    return mod;
  } catch (error) {
    throw new Error("@Service.update: " + error.message);
  }
}
async function remove(moduleId, userId) {
  try {
    const mod = await Module.findByPk(moduleId);
    if (!mod) {
      throw new Error("module not found");
    }
    console.log(mod.courseId);
    const course = await Course.findOne({
      where: {
        courseId: mod.courseId,
        userId: userId,
      },
    });
    if (!course) {
      throw new Error("Module does not belong to the specified user");
    }
    await mod.destroy();
    return "mod deleted successfully";
  } catch (error) {
    throw new Error("@Service.remove: " + error.message);
  }
}

async function getByCourse(courseId) {
  try {
    const modules = await Module.findAll({ where: { courseId } });
    if (!modules) {
      return [];
    }
    return module;
  } catch (error) {
    throw new Error("@Service.getByCourse: " + error.message);
  }
}

async function getById(id) {
  try {
    const mod = await Module.findByPk(id);
    if (!mod) {
      return [];
    }
    return mod;
  } catch (error) {
    throw new Error("@Service.getById: " + error.message);
  }
}

async function countModulesInCourse(courseId) {
  try {
    // Find the course by ID and include its modules
    const count = await Module.count({
      where: { courseId },
    });
    return count;
  } catch (error) {
    throw new Error("@Service.countModulesInCourse:" + error.message);
  }
}

module.exports = {
  create,
  update,
  remove,
  getByCourse,
  getById,
};
