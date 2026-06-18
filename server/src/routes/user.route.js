import express from "express";
import {
  followUnfollowUser,
  getUserProfile,
  loginUser,
  logoutUser,
  signupUser,
  updateUser,
} from "../controllers/user.controller.js";
import protectRoute from "../middleware/protectRoute.middleware.js";

const userRouter = express.Router();

userRouter.get("/profile/:query", getUserProfile);
userRouter.post("/signup", signupUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", logoutUser);
userRouter.post("/follow/:id", protectRoute, followUnfollowUser);
userRouter.put("/update/:id", protectRoute, updateUser);

export default userRouter;
