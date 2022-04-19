const Controller = require("../controller/postController");
const express = require("express");
const { authorization } = require("../middleware/auth");
const router = express.Router();


router.get("/", Controller.getAllpost);
router.post('/add/:id',authorization, Controller.addPost)
router.delete('/delete/:id', authorization, Controller.deletePost)

module.exports = router;