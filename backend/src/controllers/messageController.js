import User from "../models/User.js";
import Message from "../models/Message.js";
import { getRecieverSocketId, io } from "../lib/socket.js";

export const getallusers = async (req, res) => {
  const loggedinUser = req.user.id || req.user._id;
  try {
    const filteredusers = await User.find({
      _id: { $ne: loggedinUser },
    }).select("-password -refershToken");
    res
      .status(200)
      .json({ message: "All other users", users: { filteredusers } });
  } catch (error) {
    res.status(500).json({ message: "Internel server error" });
  }
};

export const getallmessages = async (req, res) => {
  const { id: userchatid } = req.params;
  const senderId = req.user._id || req.user.id;
  try {
    const messages = await Message.find({
      $or: [
        { senderId: senderId, recieverId: userchatid },
        { senderId: userchatid, recieverId: senderId },
      ],
    }).sort({ created: 1 });
    res.status(200).json({
      messages: messages,
      success: true,
      senderId: senderId,
      recieverId: userchatid,
    });
  } catch (error) {
    res.status(500).json({
      messages: "Internel server error",
      success: false,
    });
  }
};

export const sendmessage = async (req, res) => {
  const { id: recieverId } = req.params;
  const { text, image } = req.body;
  const senderId = req.user._id || req.user.id;
  try {
    const newmessage = await Message.create({
      senderId: senderId,
      recieverId: recieverId,
      text: text,
      image: image,
    });
    res.status(201).json({
      message: newmessage,
      success: true,
      senderId: senderId,
      recieverId: recieverId,
    });

    //logic to send mesaage and recieve mmesage in real time using socket.io
    const recieverSocketId=getRecieverSocketId(recieverId);
    if(recieverSocketId){
      io.to(recieverSocketId).emit("newMessage",newmessage);
    }
  } catch (error) {
    console.error("sendmessage error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
