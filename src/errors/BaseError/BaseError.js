class BaseError extends Error {
  constructor(message = "Internal Server Error", status = 500) {
    super();
    this.message = message;
    this.status = status;
  }

  send(res) {
    res.status(this.status).json({ detail: this.message });
  }
}

export default BaseError;
