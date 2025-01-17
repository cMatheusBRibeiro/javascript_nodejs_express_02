import mongoose from "mongoose";

export const authorSchema = mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    name: { type: String, required: true },
    nacionality: { type: String },
  },
  { versionKey: false }
);

export const Author = mongoose.model("author", authorSchema);

export default Author;
