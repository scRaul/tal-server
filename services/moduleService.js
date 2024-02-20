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
    throw new Error("Error creating mod: " + error.message);
  }
}
async function update(moduleId, newData) {
  try {
    const mod = await Module.findByPk(moduleId);
    if (!mod) {
      throw new Error("Mod not found");
    }
    await mod.update(newData);
    return mod;
  } catch (error) {
    throw new Error("Error updating mod: " + error.message);
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
    throw new Error("Error deleting mod: " + error.message);
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
    throw new Error("Error obtiaining modules");
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
    throw new Error("Error getting courses" + error.message);
  }
}

async function countModulesInCourse(courseId) {
  try {
    // Find the course by ID and include its modules
    const course = await Course.findByPk(courseId, {
      include: [
        {
          model: Module,
          attributes: [], // Exclude module attributes from the result
        },
      ],
    });

    // Access the modules array from the course object and get its length
    const moduleCount = course && course.Modules ? course.Modules.length : 0;

    return moduleCount;
  } catch (error) {
    console.error("Error counting modules:", error);
    throw error; // Forward the error to the caller
  }
}

module.exports = {
  create,
  update,
  remove,
  getByCourse,
  getById,
};
