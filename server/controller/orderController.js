const {User,Order,Post} = require('../models/index');
const Xendit = require('xendit-node');
const nodemailer = require("nodemailer");
const {snap} =require('../helper/midtrans')
class orderController{
  static async addOrder(req,res,next){
    try {
    const response= await Post.findOne({
      where:{
        id: req.params.postId
      }
    })
    const resUser = await User.findOne({
      where:{id: req.user.id}
    })
    let newData = {
      location: req.body.location,
      message: req.body.message,
      emailPost: response.emailPost,
      status: "Waiting",
      userId: req.user.id,
      postId: req.params.postId
    }
      let emailPost = response.emailPost
      let emailUser = resUser.email
      const transporter = await nodemailer.createTransport({
        service: "hotmail",
        auth: {
          user: "dairypost@outlook.com",
          pass: "Berandal89",
        },
      });
      let option1 = {
        from: "dairypost@outlook.com",
        to: `${emailPost}`,
        subject: "Ada yang Order, cek aplikasi Anda",
        text: `Welcome to the jungle!`,
      };
      let option2 = {
        from: "dairypost@outlook.com",
        to: `${emailUser}`,
        subject: "selamat anda berasil membuat orderan",
        text: `Welcome to the jungle!`,
      };
     let info1 = await  transporter.sendMail(option1, (err, info) => {
        if (err) {
          return;
        }
      });
      let info2 = await transporter.sendMail(option2, (err, info) => {
        if (err) {
          return;
        }
      });
    const orders = await Order.create(newData);
    res.status(201).json(orders);
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
        res.status(200).json({
          message: "Order updated status",
          status: status
        });
      }
    } catch (error) {
      next(error);
    }
  }
  static async getOrder(req,res,next){
    try {
      const orders = await Order.findOne({
        where:{
          userId: req.user.id
        }
      })
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
  static async midtransByOrder(req,res,next){
    try {
      let parameter = {
          transaction_details: {
              order_id: Math.floor(Math.random() * 100000),
              gross_amount: 50000
          }, credit_card:{
              secure : true
          }
      };
      const transaction = await snap.createTransaction(parameter)
      res.status(201).json({
          token: transaction.token,
          redirect_url: transaction.redirect_url
      })
  } catch (error) {
      next(error)
  }
}
}


module.exports = orderController;