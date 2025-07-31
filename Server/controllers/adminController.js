import jwt from "jsonwebtoken";
import Blog from "../models/Blog.js";
import comment from "../models/Comments.js";
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = await jwt.sign({ email }, process.env.JWT_SECRET);
    console.log("Admin Token", token);

    res.json({ success: true, token });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export const getAllBlogsAdmin = async (req, res) => {
  try {
    const blog = await Blog.find({}).sort({ createdAt: -1 });
    res.json({ success: true, blog });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export const getAllComments = async (req, res) => {
  try {
    const comment = await comment
      .find({})
      .populate("blog")
      .sort({ createdAt: -1 });

    res.json({ success: true, comment });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};
