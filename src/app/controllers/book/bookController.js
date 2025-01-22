import InvalidRequest from "../../../errors/InvalidRequest/InvalidRequest.js";
import NotFound from "../../../errors/NotFound/NotFound.js";
import { Author, Book } from "../../models/index.js";

const createFilterForGetAllBooks = async ({
  publisher,
  title,
  minPages,
  maxPages,
  authorName,
}) => {
  const filter = {};

  /**
   * Both options are valid for filter values with texts and are not case sensitive.
   */
  if (publisher) filter.publisher = new RegExp(publisher, "i");
  if (title) filter.title = { $regex: title, $options: "i" };

  /**
   * Filter books by pages when greater than or equal and less than or equal.
   */
  if (minPages || maxPages) filter.pages = {};
  if (minPages) filter.pages.$gte = minPages;
  if (maxPages) filter.pages.$lte = maxPages;

  if (authorName) {
    const authors = await Author.find({
      name: { $regex: authorName, $options: "i" },
    });

    filter.author = {
      $in: authors.map((author) => author._id),
    };
  }

  return filter;
};

class BookController {
  static async getAllBooks(req, res, next) {
    const filter = await createFilterForGetAllBooks(req.query);
    let { page = 0, size = 10, offset = 0 } = req.query;

    page = parseInt(page);
    size = parseInt(size);
    offset = parseInt(offset);

    try {
      if (page >= 0 && size >= 0) {
        const booksList = await Book.find(filter)
          .skip(page * size + offset)
          .limit(size)
          .populate("author")
          .exec();

        res.status(200).json({ content: booksList, page, size, offset });
      } else {
        next(new InvalidRequest("Page and/or size are invalid!"));
      }
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
