const {User,Order,Post} = require('../models/index');

class postController{
  static async getAllpost(req, res,next){
    try {
      const posts = await Post.findAll();
      if (!posts) {
        next({
          name: "notFound",
          message: "Post not Found",
        });
      } else {
        res.status(200).json(posts);
      }
    } catch (error) {
      console.log("error: ", error);
      next(error);
    }
  }
  static async addPost(req, res,next){
    let newData = {
      location: req.body.location,
      description: req.body.description,
      category: req.body.category,
      emailPost: req.user.email,
      imageUrl: req.body.imageUrl
    };
    console.log(newData);
    try {
      const post = await Post.create(newData);
      res.status(201).json(post);
    } catch (error) {
      console.log("error: ", error);
      next(error);
    }
  }
  static async deletePost(req, res,next){
    let id = req.params.id;
    try {
      const post = await Post.destroy({
        where: {
          id: id
        }
      });
      if (!post) {
        next({
          name: "notFound",
          message: "Post not Found",
        });
      } else {
        res.status(200).json({
          message: "Post deleted"
        });
      }
    } catch (error) {
      next(error);
    }
  }
}
module.exports = postController;