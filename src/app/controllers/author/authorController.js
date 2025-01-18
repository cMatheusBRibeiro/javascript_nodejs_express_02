import Author from "../../models/author/author.js";

class AuthorController {
  static async getAllAuthors(_, res, next) {
    try {
      const authorsList = await Author.find({});

      res.status(200).json(authorsList);
    } catch (error) {
      next(error);
    }
  }

  static async getAuthorById(req, res, next) {
    try {
      const author = await Author.findById(req.params.id);

      res.status(200).json(author);
    } catch (error) {
      next(error);
    }
  }

  static async addAuthor(req, res, next) {
    try {
      const newAuthor = await Author.create(req.body);

      res
        .status(201)
        .json({ detail: "Author created successfully!", author: newAuthor });
    } catch (error) {
      next(error);
    }
  }

  static async updateAuthor(req, res, next) {
    try {
      await Author.findByIdAndUpdate(req.params.id, req.body);

      const updatedAuthor = await Author.findById(req.params.id);
      res
        .status(200)
        .json({ detail: "Author updated successfully", author: updatedAuthor });
    } catch (error) {
      next(error);
    }
  }

  static async deleteAuthor(req, res, next) {
    try {
      await Author.findByIdAndDelete(req.params.id);

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export default AuthorController;
