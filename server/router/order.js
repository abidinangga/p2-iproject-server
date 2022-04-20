const Controller = require("../controller/orderController");
const express = require("express");
const router = express.Router();

router.post("/add/:postId", Controller.addOrder);
router.patch("/:id", Controller.updateStatusOrder);


module.exports = router;
