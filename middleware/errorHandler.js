module.exports = (error, req, res, next) => {
  var message = error.message;
  if (error.name === "SequelizeValidationError") {
    message = "Fix the following fields: ";
    error.errors.forEach((element) => {
      message += element.path;
    });

    error.statusCode = 422;
  }
  const status = error.statusCode || 500;
  res.status(status).json({
    message: message,
  });
};
