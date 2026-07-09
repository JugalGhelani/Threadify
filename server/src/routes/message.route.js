import express from "express";
import { getConversation, getMessage, sendMessage } from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.middleware.js";

const messageRouter = express.Router();

messageRouter.get("/conversations", protectRoute, getConversation);
messageRouter.get("/:otherUserId", protectRoute, getMessage);
messageRouter.post("/", protectRoute, sendMessage);

export default messageRouter;
