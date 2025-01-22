import express from "express";
import BookController from "../../controllers/book/bookController.js";
import pagination from "../../../middlewares/pagination/pagination.js";

const bookRouter = express.Router();

bookRouter.get("/books", BookController.getAllBooks, pagination);

bookRouter.get("/books/:id", BookController.getBookById);

bookRouter.post("/books", BookController.addBook);

bookRouter.put("/books/:id", BookController.updateBook);

bookRouter.delete("/books/:id", BookController.deleteBook);

export default bookRouter;
