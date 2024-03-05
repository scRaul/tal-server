const Module = require("../models/module");

async function create(courseId, title) {
  try {
    const newCourse = await Module.create({ courseId, title });
    return newCourse;
  } catch (err) {
    console.error("Error creating module:", err);
    throw err;
  }
}
async function remove(moduleId) {
  try {
    const deletedCount = await Module.destroy({
      where: { moduleId },
    });
    return deletedCount;
  } catch (err) {
    console.error("Error removing module:", err);
    throw err;
  }
}
async function update(newDataObj) {
  try {
    const updatedModule = await Module.update(newDataObj, {
      where: { moduleId: newDataObj.moduleId },
    });
    return updatedModule;
  } catch (err) {
    console.error("Error updating module:", err);
    throw err;
  }
}
async function getAll() {
  try {
    const allModules = await Module.findAll();
    return allModules;
  } catch (err) {
    console.error("Error getting all module:", err);
    throw err;
  }
}
async function getModuleById(moduleId) {
  try {
    const module = await Module.findByPk(moduleId);
    return module;
  } catch (err) {
    console.error("Error getting course by moduleId:", err);
    throw err;
  }
}
async function getModuleByCourse(courseId) {
  try {
    const modules = await Module.findAll({ where: courseId });
    return modules;
  } catch (err) {
    console.error("Error getting module by Course:", err);
    throw err;
  }
}
module.exports = {
  create,
  remove,
  update,
  getAll,
  getModuleById,
};
