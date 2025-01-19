import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    title: { type: String, required: [true, "Book title is required"] },
    publisher: {
      type: String,
      required: [true, "Publisher is required"],
      enum: {
        values: ["House Code", "O'Reilly"],
        message: 'Publisher "{VALUE}" is not allowed',
      },
    },
    price: { type: Number },
    pages: {
      type: Number,
      min: [10, "Pages must be larger than 10, value sent: {VALUE}"],
      max: [5000, "Pages must be smaller than 5,000, value sent: {VALUE}"],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "author",
      required: [true, "Author is required"],
    },
  },
  { versionKey: false }
);

const Book = mongoose.model("book", bookSchema);

export default Book;
