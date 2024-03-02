const express = require("express");
const router = express.Router();
const controller = require("../controllers/authController");
const isAuth = require("../middleware/isAuth");
// const multer = require("multer"); //parse formData
// router.use(multer().none());

/**
 * @body {username,email,password}
 * @res {message,user}
 */
router.post("/signup", controller.signup);

/**
 * @body {email, password}
 * @res message
 */
router.post("/login", controller.login);

router.use(isAuth);

router.get("/hasToken", (req, res, next) => {
  try {
    res.status(200).send(!!req.userData);
  } catch (err) {
    next(err);
  }
});

router.delete("/logout", controller.logoutSingle);
router.delete("/logout-all", controller.logoutAll);

module.exports = router;
