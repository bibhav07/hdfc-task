const { StatusCodes } = require("http-status-codes");
const CustomErrorHandler = require("../services/customErrorHandler")

const errorHandler = (err, req, res, next) => {
  let statusCode = err.status
    ? err.status
    : err.statusCode
    ? err.statusCode
    : StatusCodes.INTERNAL_SERVER_ERROR;

  let data = {
    message: err.message,
  };

  if (err instanceof CustomErrorHandler) {
    statusCode = err.status;
    data = {
      message: err.message,
    };
  }

  return res.status(statusCode).json(data);
};

module.exports = errorHandler;
