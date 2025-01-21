import NotFound from "../../../errors/NotFound/NotFound.js";
import { Book } from "../../models/index.js";

class BookController {
  static async getAllBooks(req, res, next) {
    const { publisher, title } = req.query;

    const filter = {};

    if (publisher) filter["publisher"] = new RegExp(publisher, "i");
    if (title) filter["title"] = new RegExp(title, "i");

    try {
      const booksList = await Book.find(filter).populate("author").exec();

      res.status(200).json(booksList);
    } catch (error) {
      next(error);
    }
  }

  static async getBookById(req, res, next) {
    try {
      const book = await Book.findById(req.params.id).populate("author").exec();

      if (book !== null) {
        res.status(200).json(book);
      } else {
        next(new NotFound("Book not found."));
      }
    } catch (error) {
      next(error);
    }
  }

  static async addBook(req, res, next) {
    try {
      const createdBook = await Book.create(req.body);

      res
        .status(201)
        .json({ detail: "Book created successfully!", book: createdBook });
    } catch (error) {
      next(error);
    }
  }

  static async updateBook(req, res, next) {
    try {
      await Book.findByIdAndUpdate(req.params.id, req.body);

      const updatedBook = await Book.findById(req.params.id);

      if (updatedBook) {
        res
          .status(200)
          .json({ detail: "Book updated successfully", book: updatedBook });
      } else {
        next(new NotFound("Book not found."));
      }
    } catch (error) {
      next(error);
    }
  }

  static async deleteBook(req, res, next) {
    try {
      const deletedBook = await Book.findByIdAndDelete(req.params.id);

      if (deletedBook !== null) {
        res.status(204).send();
      } else {
        next(new NotFound("Book not found."));
      }
    } catch (error) {
      next(error);
    }
  }
}

export default BookController;
