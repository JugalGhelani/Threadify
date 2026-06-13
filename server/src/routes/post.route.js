import express from "express";
import {
  createPost,
  deletePost,
  getFeedPosts,
  getPost,
  likeUnlikePost,
  replyToPost,
} from "../controllers/post.controller.js";
import protectRoute from "../middleware/protectRoute.middleware.js";

const postRouter = express.Router();

postRouter.get("/feed", protectRoute, getFeedPosts);
postRouter.get("/:id", getPost);
postRouter.post("/create", protectRoute, createPost);
postRouter.delete("/:id", protectRoute, deletePost);
postRouter.post("/like/:id", protectRoute, likeUnlikePost);
postRouter.post("/reply/:id", protectRoute, replyToPost);

export default postRouter;
