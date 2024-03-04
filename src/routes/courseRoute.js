const express = require("express");
const router = express.Router();
const controller = require("../controllers/courseController");
const multer = require("multer"); //parse formData
const isAuth = require("../middleware/isAuth");

router.use(multer().none());

router.get("/get/:id", controller.getCourseById);
router.get("/content/:id", controller.getCourseContent);
router.use(isAuth);
router.post("/create", controller.createCourse);
router.delete("/delete/:id", controller.deleteCourse);
router.put("/update", controller.updateCourse);
router.get("/my-courses", controller.getCreatorsCourses);
module.exports = router;
