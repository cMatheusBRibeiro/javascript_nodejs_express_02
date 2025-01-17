import express from "express";
import BookController from "../../controllers/book/bookController.js";

const bookRouter = express.Router();

bookRouter.get("/books", BookController.getAllBooks);

bookRouter.get("/books/:id", BookController.getBookById);

bookRouter.post("/books", BookController.addBook);

bookRouter.put("/books/:id", BookController.updateBook);

bookRouter.delete("/books/:id", BookController.deleteBook);

export default bookRouter;
