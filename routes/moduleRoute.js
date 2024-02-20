const express = require("express");
const router = express.Router();
const controller = require("../controllers/moduleController");
const multer = require("multer"); //parse formData
const isAuth = require("../middleware/isAuth");

router.use(multer().none());
// router.get("/id/:id", controller.getModuleById);
router.use(isAuth);
router.post("/create", controller.createModule);
router.delete("/delete/:id", controller.deleteModule);

module.exports = router;
