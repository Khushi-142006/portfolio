import jwt from "jsonwebtoken";
import Contact from "../models/Contact.js";

export const loginAdmin = (req, res, next) => {
  try {
    const { username, password, secretPhrase } = req.body;

    if (!username || !password || !secretPhrase) {
      return res.status(400).json({
        success: false,
        message: "Username, password, and secret phrase are all required."
      });
    }

    const systemUsername = process.env.ADMIN_USERNAME;
    const systemPassword = process.env.ADMIN_PASSWORD;
    const systemSecret = process.env.ADMIN_SECRET;

    if (
      username !== systemUsername ||
      password !== systemPassword ||
      secretPhrase !== systemSecret
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials or secret phrase."
      });
    }

    // Credentials match, sign JWT
    const token = jwt.sign(
      { username },
      process.env.JWT_SECRET,
      { expiresIn: "4h" }
    );

    res.json({
      success: true,
      token,
      message: "Authentication successful."
    });
  } catch (error) {
    next(error);
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 }).exec();
    res.json(messages);
  } catch (error) {
    next(error);
  }
};

export const markMessageAsRead = async (req, res, next) => {
  try {
    const { id } = req.params;
    const message = await Contact.findByIdAndUpdate(
      id,
      { isRead: true },
      { new: true }
    ).exec();

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found."
      });
    }

    res.json({
      success: true,
      message: "Message marked as read.",
      data: message
    });
  } catch (error) {
    next(error);
  }
};

export const markMessageAsUnread = async (req, res, next) => {
  try {
    const { id } = req.params;
    const message = await Contact.findByIdAndUpdate(
      id,
      { isRead: false },
      { new: true }
    ).exec();

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found."
      });
    }

    res.json({
      success: true,
      message: "Message marked as unread.",
      data: message
    });
  } catch (error) {
    next(error);
  }
};

export const deleteMessage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const message = await Contact.findByIdAndDelete(id).exec();

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found."
      });
    }

    res.json({
      success: true,
      message: "Message deleted successfully."
    });
  } catch (error) {
    next(error);
  }
};
