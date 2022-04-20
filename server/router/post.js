const Controller = require("../controller/postController");
const express = require("express");
const { authorization,authentication } = require("../middleware/auth");
const router = express.Router();


router.get("/", Controller.getAllpost);
router.use(authentication)
router.post('/add',authorization, Controller.addPost)
router.delete('/delete/:id', authorization, Controller.deletePost)

module.exports = router;