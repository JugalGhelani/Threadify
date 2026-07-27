import express from "express";
import {
  followUnfollowUser,
  freezeAccount,
  getSuggestedUsers,
  getUserProfile,
  loginUser,
  logoutUser,
  signupUser,
  updateUser,
} from "../controllers/user.controller.js";
import protectRoute from "../middleware/protectRoute.middleware.js";

const userRouter = express.Router();

userRouter.get("/profile/:query", getUserProfile);
userRouter.get("/suggested", protectRoute, getSuggestedUsers);
userRouter.post("/signup", signupUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", logoutUser);
userRouter.post("/follow/:id", protectRoute, followUnfollowUser);
userRouter.put("/update/:id", protectRoute, updateUser);
userRouter.put("/freeze", protectRoute, freezeAccount);

export default userRouter;
