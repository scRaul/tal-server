const express = require("express");
const router = express.Router();
const controller = require("../controllers/lessonController");
const multer = require("multer"); //parse formData
const isAuth = require("../middleware/isAuth");

router.use(multer().none());

router.get("/id/:id", controller.getlessonById);
router.use(isAuth);
router.post("/create", controller.createlesson);

//retrive
router.get("/my-lessons", controller.getCreatorslessons);
module.exports = router;
