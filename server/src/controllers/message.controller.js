import { Conversation } from "../models/conversation.model.js";
import { Message } from "../models/message.model.js";

// Send Message
const sendMessage = async (req, res) => {
  try {
    const { reciepientId, message } = req.body;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, reciepientId] },
    });
    if (!conversation) {
      conversation = new Conversation({
        participants: [senderId, reciepientId],
        lastMessage: {
          text: message,
          sender: senderId,
        },
      });
      await conversation.save();
    }
    const newMessage = new Message({
      conversationId: conversation._id,
      sender: senderId,
      text: message,
    });

    await Promise.all([
      newMessage.save(),
      conversation.updateOne({
        lastMessage: { text: message, sender: senderId },
      }),
    ]);

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Message
const getMessage = async (req, res) => {
  const { otherUserId } = req.params;
  const userId = req.user._id;
  try {
    const conversation = await Conversation.findOne({
      participants: { $all: [userId, otherUserId] },
    });

    if (!conversation) {
      res.status(404).json({ error: "Conversation not found" });
    }

    const messages = await Message.find({
      conversationId: conversation._id,
    }).sort({ createdAt: 1 });

    res.status(201).json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Conversation
const getConversation = async (req, res) => {
  const userId = req.user._id;
  try {
    const conversation = await Conversation.find({
      participants: userId,
    }).populate({ path: "participants", select: "username profilePic" });
    res.status(200).json(conversation)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { sendMessage, getMessage, getConversation };
