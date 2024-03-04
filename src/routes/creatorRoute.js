const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/isAuth");

router.use(isAuth);
//router.get("/my-courses");
//router.get("/course-content/:id");
//router.get("/lesson/:id");

router.get;

module.exports = router;
