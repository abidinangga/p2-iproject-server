const {User,Order,Post} = require('../models/index');
const Xendit = require('xendit-node');
const nodemailer = require("nodemailer");

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
    let email ={
      emailPost: response.emailPost,
      emailUser: resUser.email,
    }
    .then(() => {
      const transporter = nodemailer.createTransport({
        service: "hotmail",
        auth: {
          user: "dairypost@outlook.com",
          pass: "Berandal89",
        },
      });
      let option = {
        from: "dairypost@outlook.com",
        to: `${email}`,
        subject: "Registration Success!",
        text: `Welcome to the jungle, ${username}!`,
      };
      transporter.sendMail(option, (err, info) => {
        if (err) {
          return;
        }
      });
    })

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
  static async xenditByOrder(req,res,next){
    try {
      const x = new Xendit({ secretKey:process.env.PUBLIC_KEY_XENDIT});
      const { Invoice } = x;
      const i = new Invoice();
      const resp = await i.createInvoice({
        external_id: 'payment-link-example',
        amount: 180000,
        description: 'bayar jasa',
        invoice_duration: 86400,
      })
      } catch (error) {
      next(error)
      }
    }
}

module.exports = orderController;