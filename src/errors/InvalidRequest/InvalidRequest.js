import BaseError from "../BaseError/BaseError.js";

class InvalidRequest extends BaseError {
  constructor(message = "One or more values passed is invalid", status = 400) {
    super(message, status);
  }
}

export default InvalidRequest;
