import Author from "../../models/author/author.js";
import Book from "../../models/book/book.js";

class BookController {
  static async getAllBooks(req, res) {
    const publisher = req.query.publisher;

    const filter = {};

    if (publisher) {
      filter["publisher"] = new RegExp(publisher, "i");
    }

    try {
      const booksList = await Book.find(filter).populate("author").exec();

      res.status(200).json(booksList);
    } catch (error) {
      res
        .status(500)
        .json({ detail: `Error when get all books: ${error.message}` });
    }
  }

  static async getBookById(req, res) {
    try {
      const book = await Book.findById(req.params.id).populate("author").exec();

      res.status(200).json(book);
    } catch (error) {
      res
        .status(500)
        .json({ detail: `Error when get book by id: ${error.message}` });
    }
  }

  static async addBook(req, res) {
    try {
      const createdBook = await Book.create(req.body);

      res
        .status(201)
        .json({ detail: "Book created successfully!", book: createdBook });
    } catch (error) {
      res
        .status(500)
        .json({ detail: `Error when created a new book: ${error.message}` });
    }
  }

  static async updateBook(req, res) {
    try {
      await Book.findByIdAndUpdate(req.params.id, req.body);

      const updatedBook = await Book.findById(req.params.id);
      res
        .status(200)
        .json({ detail: "Book updated successfully", book: updatedBook });
    } catch (error) {
      res
        .status(500)
        .json({ detail: `Error when update author: ${error.message}` });
    }
  }

  static async deleteBook(req, res) {
    try {
      await Book.findByIdAndDelete(req.params.id);

      res.status(204).send();
    } catch (error) {
      res
        .status(500)
        .json({ detail: `Error when delete book: ${error.message}` });
    }
  }
}

export default BookController;
