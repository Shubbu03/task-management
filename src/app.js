import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

//MIDDLEWARES =>
app.use(express.json({ limit: "16kb" })); // limit to set how much data is allowed on server through JSON at a time
app.use(express.urlencoded({ extended: true, limit: "16kb" })); //extended to allow nested objects.
app.use(express.static("public")); // static to store files / favicons in a local folder
app.use(cookieParser());

//ROUTES =>
import userRouter from "./routes/user.routes.js";

//ROUTES DECLARATION =>

app.use("/api/v1/users", userRouter);

export { app };
