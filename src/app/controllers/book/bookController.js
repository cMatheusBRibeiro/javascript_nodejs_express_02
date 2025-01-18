import Book from "../../models/book/book.js";

class BookController {
  static async getAllBooks(req, res, next) {
    const publisher = req.query.publisher;

    const filter = {};

    if (publisher) {
      filter["publisher"] = new RegExp(publisher, "i");
    }

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
        res.status(404).json({ detail: "Book not found." });
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
      res
        .status(200)
        .json({ detail: "Book updated successfully", book: updatedBook });
    } catch (error) {
      next(error);
    }
  }

  static async deleteBook(req, res, next) {
    try {
      await Book.findByIdAndDelete(req.params.id);

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export default BookController;
