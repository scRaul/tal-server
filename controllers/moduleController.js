require("dotenv").config();
const moduleService = require("../services/moduleService");

exports.createModule = async (req, res, next) => {
  try {
    const { courseId, title } = req.body;

    if (!courseId || !title) {
      const error = new Error("missing required fields");
      error.statusCode = 400;
      throw error;
    }
    const moduleResponse = await moduleService.create(courseId, title);
    res
      .status(201)
      .json({ message: "module created successfully", module: moduleResponse });
  } catch (err) {
    const error = new Error("@Controller.createModule" + err.message);
    error.statusCode = err.statusCode || 500;
    next(error);
  }
};
exports.getCoursesModules = async (req, res, next) => {
  try {
    const id = req.userId;
    const modules = await moduleService.getByCreator(id);
    res
      .status(200)
      .json({ message: "successfully fetched your modules", modules });
  } catch (err) {
    const error = new Error("@Controller.getCoursesodules" + err.message);
    error.statusCode = err.statusCode || 500;
    next(error);
  }
};
exports.getModuleById = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) {
      const error = new Error("missing required fields");
      error.statusCode = 400;
      throw error;
    }
    const module = await moduleService.getById(id);
    res
      .status(200)
      .json({ message: "successfully fetched your modules", module });
  } catch (err) {
    const error = new Error("@Controller.getModuleById" + err.message);
    error.statusCode = err.statusCode || 500;
    next(error);
  }
};

exports.deleteModule = async (req, res, next) => {
  try {
    const id = req.params.id;
    const userId = req.userId;
    if (!id) {
      res.status(400).json({ message: "misssing id field" });
    }

    const response = await moduleService.remove(id, userId);
    console.log(response);
    res.status(200).json({ message: "successfully deleted course" });
  } catch (error) {
    next(error);
  }
};
exports.updateModule = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { moduleId, courseId, title, index, isPublic } = req.body;
    if (!moduleId || !courseId || !title || !index || !isPublic || !userId) {
      const error = new Error("missing required fields");
      error.statusCode = 400;
      throw error;
    }
    const newData = { moduleId, courseId, title, index, isPublic };
    const updateModule = moduleService.update(userId, newData);
  } catch (err) {
    const error = new Error("@Controller.getModuleById" + err.message);
    error.statusCode = err.statusCode || 500;
    next(error);
  }
};
