const { jwtVerify } = require("../helper/jwt");
const { User } = require("../models/index");

function authentication(req, res, next) {
  const access_token = req.headers.access_token;
  if (access_token) {
    const payload = jwtVerify(access_token);
    User.findByPk(payload.id)
      .then((data) => {
        if (data) {
          req.user = {
            id: data.id,
            role: data.role,
            username: data.username,
            email:data.email
          };
          next();
        } else {
          next({
            name: "invalidToken",
            message: "Invalid Token",
          });
        }
      })
      .catch((err) => {
        next(err);
      });
  } else {
    next({
      name: "notLogin",
      message: "You must login first",
    });
  }
}

function authorization(req, res, next) {
  const id = req.user.id;
  User.findByPk(id)
    .then((data) => {
      if (data) {
        if (req.user.role === "Admin" || req.user.role === "Staff" ) {
          next();
        } else {
          next({
            name: "Forbidden",
            message: "Forbidden to access",
          });
        }
      } else {
        next({
          name: "notFound",
          message: "Movie not Found",
        });
      }
    })
    .catch((error) => {
      next(error);
    });
}

module.exports = {
  authentication,
  authorization,
};
