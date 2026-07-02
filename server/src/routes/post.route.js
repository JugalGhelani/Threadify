import express from "express";
import {
  createPost,
  deletePost,
  getFeedPosts,
  getPost,
  getUserPost,
  likeUnlikePost,
  replyToPost,
} from "../controllers/post.controller.js";
import protectRoute from "../middleware/protectRoute.middleware.js";

const postRouter = express.Router();

postRouter.get("/feed", protectRoute, getFeedPosts);
postRouter.get("/user/:username", getUserPost);
postRouter.get("/:id", getPost);
postRouter.post("/create", protectRoute, createPost);
postRouter.delete("/:id", protectRoute, deletePost);
postRouter.put("/like/:id", protectRoute, likeUnlikePost);
postRouter.put("/reply/:id", protectRoute, replyToPost);

export default postRouter;
