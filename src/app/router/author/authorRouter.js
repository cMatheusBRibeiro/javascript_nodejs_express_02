import express from "express";
import AuthorController from "../../controllers/author/AuthorController.js";
import pagination from "../../../middlewares/pagination/pagination.js";

const authorRouter = express.Router();

authorRouter.get("/authors", AuthorController.getAllAuthors, pagination);

authorRouter.get("/authors/:id", AuthorController.getAuthorById);

authorRouter.post("/authors", AuthorController.addAuthor);

authorRouter.put("/authors/:id", AuthorController.updateAuthor);

authorRouter.delete("/authors/:id", AuthorController.deleteAuthor);

export default authorRouter;
