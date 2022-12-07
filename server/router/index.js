const express = require("express");
const { authentication } = require("../middleware/auth");
const router = express.Router();
const user = require("./user");
const order = require("./order");
const post = require("./post")

router.use("/", user);
router.use("/post",post)
router.use(authentication);
router.use("/order", order);

module.exports = router;