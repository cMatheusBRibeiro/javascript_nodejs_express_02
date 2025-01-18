import express from "express";
import { databaseConnect } from "../config/db/index.js";
import routes from "./router/index.js";
import errorHandling from "../middlewares/errors/errorHandling.js";

await databaseConnect();

const app = express();

routes(app);

app.use(errorHandling);

export default app;
