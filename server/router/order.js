const Controller = require("../controller/orderController");
const express = require("express");
const router = express.Router();

router.post("/add", Controller.addOrder);
router.get("/detail/:id", Controller.orderDetail);
router.patch("/:id", Controller.updateStatusOrder);


module.exports = router;
