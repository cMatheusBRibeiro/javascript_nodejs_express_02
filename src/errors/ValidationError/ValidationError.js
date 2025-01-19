import InvalidRequest from "../InvalidRequest/InvalidRequest.js";

class ValidationError extends InvalidRequest {
  constructor(error) {
    super(`Errors were found`);

    this.errorFields = Object.values(error.errors).reduce((fields, err) => {
      fields.push({
        path: err.path,
        message: err.message,
      });
      return fields;
    }, []);
  }

  send(res) {
    res.status(this.status).json({
      detail: this.message,
      errors: this.errorFields,
    });
  }
}

export default ValidationError;
