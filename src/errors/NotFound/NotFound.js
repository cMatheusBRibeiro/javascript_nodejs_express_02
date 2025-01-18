import BaseError from "../BaseError/BaseError.js";

class NotFound extends BaseError {
  constructor(message = "Route not found") {
    super(message, 404);
  }
}

export default NotFound;
