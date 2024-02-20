const express = require("express");
const router = express.Router();
const controller = require("../controllers/authController");
const multer = require("multer"); //parse formData

router.use(multer().none());
router.post("/signup", controller.signup);
router.post("/login", controller.login);
module.exports = router;
