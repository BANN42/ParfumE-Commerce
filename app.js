import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import productRoutes from "./routes/productRoutes.js";
import userAuthRoutes from "./routes/userRoutes.js";

import { config } from "dotenv";
import errorHandler from "./middlewares/errorHandler.js";
config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use("/api/v1/products", productRoutes);
app.use("/api/v1/Auth/users", userAuthRoutes);

app.use(errorHandler);

export default app;
