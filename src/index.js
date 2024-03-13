import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
  path: "./env",
});

connectDB()
  .then(() => {
    app.on("error", (err) => {
      console.log("Error occured!!", err);
      throw err;
    });
    app.listen(process.env.PORT || 8000, () => {
      `Server is running at port ${process.env.PORT}`;
    });
  })
  .catch((err) => {
    console.log(`DB Connection error:: ${err}`);
  });
