import mongoose from "mongoose";
import BaseError from "../../errors/BaseError/BaseError.js";
import ValidationError from "../../errors/ValidationError/ValidationError.js";
import InvalidRequest from "../../errors/InvalidRequest/InvalidRequest.js";
import NotFound from "../../errors/NotFound/NotFound.js";

// eslint-disable-next-line no-unused-vars
const errorHandling = (error, req, res, next) => {
  console.error(error);

  if (error instanceof mongoose.Error.CastError) {
    new InvalidRequest().send(res);
  } else if (error instanceof mongoose.Error.ValidationError) {
    new ValidationError(error).send(res);
  } else if (error instanceof NotFound) {
    error.send(res);
  } else {
    new BaseError().send(res);
  }
};

export default errorHandling;
