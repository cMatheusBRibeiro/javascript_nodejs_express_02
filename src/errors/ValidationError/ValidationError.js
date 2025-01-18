import InvalidRequest from "../InvalidRequest/InvalidRequest.js";

class ValidationError extends InvalidRequest {
  constructor(error) {
    const errorsMessages = Object.values(error.errors)
      .map((err) => err.message)
      .join("; ");

    super(`These errors were found: ${errorsMessages}`);
  }
}

export default ValidationError;
