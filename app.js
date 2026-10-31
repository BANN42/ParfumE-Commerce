import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import productRoutes from "./routes/productRoutes.js";
import userAuthRoutes from "./routes/userRoutes.js";
import passport, { strategies, Strategy } from "passport";
import session, { Session } from "express-session";
import { config } from "dotenv";
config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  session({
    secret: process.env.SECRET_key,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      collectionName: "sessions",
      ttl: 8 * 24 * 60 * 60,
      autoRemove : 'native'
    }),
    rolling: true,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
      sameSite : "lax"
    },
  }),
);

app.use("/api/v1/products", productRoutes);
app.use("/api/v1/Auth/users", userAuthRoutes);

export default app;
