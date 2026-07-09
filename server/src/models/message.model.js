import mongoose, { Schema } from "mongoose";

const messsageSchema = new Schema(
  {
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    text: String,
  },
  { timestamps: true },
);

export const Message = mongoose.model("Message", messsageSchema);