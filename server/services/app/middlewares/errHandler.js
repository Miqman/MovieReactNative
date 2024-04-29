function errorHandler(err, req, res, next) {
  // console.log(err);
  switch (err.name) {
    case "JsonWebTokenError":
    case "TokenExpiredError":
    case "Authentification Failed":
      res.status(401).json({
        statusCode: 401,
        message: "Please Login First",
      });
      break;
    case "E/P_not_Valid":
      res.status(401).json({
        statusCode: 401,
        message: "Invalid email/password",
      });
      break;
    case "need_email":
      res.status(400).json({
        statusCode: 400,
        message: "Email is required",
      });
      break;
    case "E/need_password":
      res.status(400).json({
        statusCode: 400,
        message: "Password is required",
      });
      break;
    case "Not Found":
      res.status(404).json({
        statusCode: 404,
        message: err.name,
      });
      break;
    case "SequelizeValidationError":
    case "SequelizeUniqueConstraintError":
      err = err.errors.map((el) => el.message);
      res.status(400).json({
        statusCode: 400,
        message: err,
      });
      break;
    case "Forbiden":
      res.status(403).json({
        statusCode: 403,
        message: err.name,
      });
      break;
    default:
      // console.log(err);
      res.status(500).json({
        statusCode: 500,
        message: "internal Server Error",
        description: err.message,
      });
      break;
  }
}

module.exports = errorHandler;
