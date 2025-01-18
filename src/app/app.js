import express from "express";
import { databaseConnect } from "../config/db/index.js";
import routes from "./router/index.js";
import errorHandling from "../middlewares/errors/errorHandling.js";

await databaseConnect();

const app = express();

/**
 * This middleware will be execute on all requests, as it has no verb and route.
 */
app.use((_, __, next) => {
  console.log("Generic middleware before routes");
  next();
});

/**
 * This middleware will be execute when /books is requested with the GET verb.
 * On other routes, this middleware will be ignored.
 *
 * ! Using next or res is necessary because if you don't use them,
 * ! the request will be processed infinitely until it is terminated.
 */
app.get("/books", (_, __, next) => {
  console.log("Specific middleware for GET and route /books");
  next();
});

routes(app);

app.use(errorHandling);

export default app;
