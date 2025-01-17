import Author from "../../models/author/author.js";

class AuthorController {
  static async getAllAuthors(_, res) {
    try {
      const authorsList = await Author.find({});

      res.status(200).json(authorsList);
    } catch (error) {
      res
        .status(500)
        .json({ detail: `Error when get all authors: ${error.message}` });
    }
  }

  static async getAuthorById(req, res) {
    try {
      const author = await Author.findById(req.params.id);

      res.status(200).json(author);
    } catch (error) {
      res
        .status(500)
        .json({ detail: `Error when get author by id: ${error.message}` });
    }
  }

  static async addAuthor(req, res) {
    try {
      const newAuthor = await Author.create(req.body);

      res
        .status(201)
        .json({ detail: "Author created successfully!", author: newAuthor });
    } catch (error) {
      res
        .status(500)
        .json({ detail: `Error when created a new author: ${error.message}` });
    }
  }

  static async updateAuthor(req, res) {
    try {
      await Author.findByIdAndUpdate(req.params.id, req.body);

      const updatedAuthor = await Author.findById(req.params.id);
      res
        .status(200)
        .json({ detail: "Author updated successfully", author: updatedAuthor });
    } catch (error) {
      res
        .status(500)
        .json({ detail: `Error when update author: ${error.message}` });
    }
  }

  static async deleteAuthor(req, res) {
    try {
      await Author.findByIdAndDelete(req.params.id);

      res.status(204).send();
    } catch (error) {
      res
        .status(500)
        .json({ detail: `Error when delete author: ${error.message}` });
    }
  }
}

export default AuthorController;
