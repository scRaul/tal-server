const express = require("express");
const router = express.Router();
const controller = require("../controllers/studioController");
const isAuth = require("../middleware/isAuth");

router.use(isAuth);

router.get("/get-all/courses", controller.getCourses);
router.get("/get/course/:id", controller.getCourseById);

router.post("/create/course", controller.createCourse);
router.put("/update/course/:id", controller.updateCourse);
router.delete("/delete/course/:id", controller.removeCourse);

router.post("/create/module", controller.createModule);
router.put("/update/module/:id", controller.updateModule);
router.delete("/delete/module/:id", controller.deleteModule);

router.post("/create/lesson", controller.createLesson);
router.put("/update/lesson/:id", controller.updateLesson);
router.delete("/delete/lesson/:id", controller.delete);

router.module.exports = router;
