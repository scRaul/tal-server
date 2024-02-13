const express = require("express");
const router = express.Router();
const controller = require("../controllers/studioController");
const multer = require("multer");

const isAuth = require("../middleware/isAuth");

router.use(multer().none());

// when in the stuido router, a user should only be able to see their own course,
//add new courses / edit exisitng courses, or delete them

//****COURSES****

router.use(isAuth);

router.get("/courses", controller.getUsersCourses);
router.post("/new-course", controller.addCourse);
router.put("/edit/:courseId", controller.editCourse);
router.delete("delete/:courseId", controller.deleteCourse);

router.get("/modules/:courseId", controller.getModules);
router.post("modules/:courseId", conter.addModule);
router.put("modules/:courseId", controller.editModule);
router.delete("modules/:courseId".controller.deleteModule);

router.module.exports = router;
