import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./src/db/db.js";
import userRouter from "./src/routes/user.route.js";
import postRouter from "./src/routes/post.route.js";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();
const PORT = process.env.PORT;
const app = express();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Middlewares
// app.use(express.json()); // To parse JSON data in the req.body
// app.use(express.urlencoded({ extended: true })); // To parse form data in the req.body true means nessted object smoothly parse in process
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({
  extended: true,
  limit: "50mb",
}));
app.use(cookieParser());

app.get("/test-cloudinary", async (req, res) => {
  try {
    const result = await cloudinary.api.ping();
    res.json(result);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

// Routes
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is started at ${PORT}`);
  });
});
