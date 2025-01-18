import mongoose from "mongoose";

// eslint-disable-next-line no-unused-vars
const errorHandling = (error, req, res, next) => {
  console.error(error);

  if (error instanceof mongoose.Error.CastError) {
    res.status(400).json({ detail: `One or more values passed is invalid.` });
  } else if (error instanceof mongoose.Error.ValidationError) {
    const errorsMessages = Object.values(error.errors)
      .map((err) => err.message)
      .join(";");

    res
      .status(400)
      .json({ detail: `These errors were found: ${errorsMessages}` });
  } else {
    res.status(500).json({ detail: `Internal server error: ${error.message}` });
  }
};

export default errorHandling;
