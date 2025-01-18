import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    title: { type: String, required: [true, "Book title is required"] },
    publisher: { type: String, required: [true, "Publisher is required"] },
    price: { type: Number },
    pages: { type: Number },
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
