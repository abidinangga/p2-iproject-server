const { User } = require("../models");
const { comparePassword } = require("../helper/bcrypt");
const { jwtSign } = require("../helper/jwt");

class UserController {
  static async login(req, res, next) {
    let email = req.body.email;
    let password = req.body.password;
    try {
      const user = await User.findOne({ where: { email: email } });
      if (!user) {
        next({
          name: "invalidUser",
          message: "Email or Password wrong",
        });
      } else {
        if (comparePassword(password, user.password)) {
          const payload = {
            id: user.id
          };
          const access_token = jwtSign(payload);
          res
            .status(200)
            .json({
              access_token: access_token,
            });
        } else {
          next({
            name: "invalidUser",
            message: "Email or Password wrong",
          });
        }
      }
    } catch (error) {
      console.log("error: ", error);
      next(error);
    }
  }
  static async register(req, res, next) {
    let newData = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: "Staff"
    };
    try {
      const users = await User.create(newData);
      res.status(201).json({
        statusCode: 201,
        data: {
          email: users.email,
        },
      });
    } catch (error) {
      next(error);
    }
  }
 
}

module.exports = UserController;
