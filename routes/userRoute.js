const express = require("express");
const router = express.Router();
const controller = require("../controllers/userController");
const multer = require("multer"); //parse formData
const isAuth = require("../middleware/isAuth");

router.use(multer().none());
router.post("/signup", controller.signup);
router.post("/login", controller.login);
router.get("/verify", isAuth, controller.verified);

module.exports = router;
