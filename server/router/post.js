const Controller = require("../controller/postController");
const express = require("express");
const { authorization,authentication } = require("../middleware/auth");
const router = express.Router();
const multer = require("multer");
const imagekit = require("../middleware/imagekit.js");
const upload = multer({
  storage:multer.memoryStorage()
})

router.get("/", Controller.getAllpost);
router.use(authentication)
router.get("/:id", Controller.getPost);
router.post('/',authorization,upload.single("imageUrl"),imagekit,Controller.addPost)
router.delete('/:id', authorization, Controller.deletePost)

module.exports = router;