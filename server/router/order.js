const Controller = require("../controller/orderController");
const express = require("express");
const router = express.Router();

router.post("/add/:postId", Controller.addOrder);
router.get("/get/:id", Controller.getOrder);
router.patch("/:id", Controller.updateStatusOrder);
router.post("/pay", Controller.xenditByOrder);


module.exports = router;
