import express from "express";
import { createPost } from "../controllers/post.controller.js";

const postRouter = express.Router();

postRouter.post("/create", createPost)