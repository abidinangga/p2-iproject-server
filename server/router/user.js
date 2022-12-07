const Controller = require("../controller/userController");
const express = require("express");
const router = express.Router();

router.post("/login", Controller.login);
router.post("/register", Controller.register);


module.exports = router;
