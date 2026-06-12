import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./src/db/db.js";
import userRouter from "./src/routes/user.route.js";
import postRouter from "./src/routes/post.route.js";

dotenv.config();
const PORT = process.env.PORT;
const app = express();

// Middlewares
app.use(express.json()); // To parse JSON data in the req.body
app.use(express.urlencoded({ extended: true })); // To parse form data in the req.body true means nessted object smoothly parse in process
app.use(cookieParser());

// Routes
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is started at ${PORT}`);
  });
});
