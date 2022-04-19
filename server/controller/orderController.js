const {User,Order,Post} = require('../models/index');


class orderController{
  static addOrder(req,res,next){
    let newData = {
      location: req.body.location,
      message: req.body.message,
      status: "Await",
      customerId: req.user.id,
      postId: req.params.postId
    };
    try {
      const orders = Order.create(newData);
      res.status(201).json(orders);
    } catch (error) {
      next(error);
    }
  }
  static async orderDetail(req,res,next){
    let id = req.params.id;
    try {
      const orders = await Order.findOne({
        where: {
          id: id
        },
        include: [
          {
            model: User,
            as: "user",
          },
          {
            model: Post,
            as: "post",
          }
        ]
      });
      if (!orders) {
        next({
          name: "notFound",
          message: "Order not Found",
        });
      } else {
        res.status(200).json(orders);
      }
    } catch (error) {
      next(error);
    }
  }
  static async updateStatusOrder(req,res,next){
    let id = req.params.id;
    let status = req.body.status;
    try {
      const orders = await Order.update({
        status: status
      },{
        where: {
          id: id
        }
      });
      if (!orders) {
        next({
          name: "notFound",
          message: "Order not Found",
        });
      } else {
        res.status(200).json(orders);
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = orderController;