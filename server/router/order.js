const Controller = require("../controller/orderController");
const express = require("express");
const router = express.Router();

router.post("/add/:postId", Controller.addOrder);
router.get("/get", Controller.getOrder);
router.patch("/:id", Controller.updateStatusOrder);
router.post("/pay", Controller.midtransByOrder);


module.exports = router;
