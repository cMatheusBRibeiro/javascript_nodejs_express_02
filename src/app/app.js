import express from "express";
import { databaseConnect } from "../config/db/index.js";
import routes from "./router/index.js";

await databaseConnect();

const app = express();

routes(app);

export default app;
