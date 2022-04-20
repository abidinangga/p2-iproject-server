function errorHandler(err, req, res, next) {
  switch (err.name) {
    case "SequelizeValidationError":
      res.status(400).json({
        message: err.errors[0].message,
      });
      break;
    case "SequelizeUniqueConstraintError":
      res.status(400).json({
        message: err.errors[0].message,
      });
      break;
    case "notFound":
      res.status(404).json({
        message: err.message,
      });
      break;
    case "invalidUser":
      res.status(401).json({
        message: err.message,
      });
      break;
    case "invalidToken":
      res.status(401).json({
        message: err.message,
      });
      break;
    case "notLogin":
      res.status(401).json({
        message: err.message,
      });
      break;
    case "Forbidden":
      res.status(403).json({
        message: err.message,
      });
      break;
    case "JsonWebTokenError":
      res.status(401).json({
        message: "Invalid access Token",
      });
      break;
    default:
      res.status(500).json({
        message: err,
      });
      break;
  }
}
module.exports = { errorHandler };
