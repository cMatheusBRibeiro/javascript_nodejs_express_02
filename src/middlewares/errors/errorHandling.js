import mongoose from "mongoose";

// eslint-disable-next-line no-unused-vars
const errorHandling = (error, req, res, next) => {
  if (error instanceof mongoose.Error.CastError) {
    res.status(400).json({ detail: `One or more values passed is invalid.` });
  } else {
    res
      .status(500)
      .json({ detail: `Error when get book by id: ${error.message}` });
  }
};

export default errorHandling;
