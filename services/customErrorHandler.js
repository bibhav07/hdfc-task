const { StatusCodes } = require("http-status-codes");

class CustomErrorHandler extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }

  static alreadyExist(message) {
    return new CustomErrorHandler(StatusCodes.CONFLICT, message);
  }

  static wrongCredentials(message = "Wrong usermail or password") {
    return new CustomErrorHandler(401, message);
  }

  static unAuthorized(message = "unAuthorized") {
    return new CustomErrorHandler(StatusCodes.UNAUTHORIZED, message);
  }

  static notFound(message = "No user found") {
    return new CustomErrorHandler(StatusCodes.NOT_FOUND, message);
  }
  static forbiddenAccess(message = "Forbidden Access") {
    return new CustomErrorHandler(StatusCodes.FORBIDDEN, message);
  }

  static serverError(message = "Internal Server Error") {
    return new CustomErrorHandler(StatusCodes.INTERNAL_SERVER_ERROR, message);
  }

  static badRequest(message = "Bad Request") {
    return new CustomErrorHandler(StatusCodes.BAD_REQUEST, message);
  }
}

module.exports = CustomErrorHandler;
