require("dotenv").config();
const moduleService = require("../services/moduleService");

exports.createModule = async (req, res, next) => {
  try {
    const { courseId, title } = req.body;

    if (!courseId || !title) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const moduleResponse = await moduleService.create(courseId, title);
    res
      .status(201)
      .json({ message: "module created successfully", module: moduleResponse });
  } catch (err) {
    next(err);
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
    next(err);
  }
};
exports.getModuleById = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(400).json({ message: "missing id field" });
    }
    const module = await moduleService.getById(id);
    res
      .status(200)
      .json({ message: "successfully fetched your modules", module });
  } catch (err) {
    next(err);
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
