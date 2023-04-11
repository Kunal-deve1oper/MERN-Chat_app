const Chat = require("../model/chatModel");
const Message = require("../model/messageModel");
const User = require("../model/userModel");

const sendMessage = async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    res.status(400).json({ msg: "Body not properly declaes" });
    return;
  }

  let msg = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };

  try {
    let newMsg = await Message.create(msg);

    newMsg = await newMsg.populate("sender", "-password -token");
    newMsg = await newMsg.populate("chat");
    newMsg = await User.populate(newMsg, {
      path: "chat.users",
      select: "-password -token",
    });

    await Chat.findByIdAndUpdate(chatId, {
      latestMsg: newMsg,
    });
    res.status(201).json(newMsg);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

const getMessage = async (req, res) => {
  try {
    const message = await Message.find({ chat: { $eq: req.params.chatId } })
      .populate("sender", "name email pic")
      .populate("chat");
    res.status(201).json(message);
  } catch (error) {
    res.status(401).send({ erroe: error.message });
  }
};

module.exports = { sendMessage, getMessage };
