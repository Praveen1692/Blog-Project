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
  console.log("Get All Comment");
  
  try {
    const comments = await comment
      .find({})
      .populate("blog")
      .sort({ createdAt: -1 });

    res.json({ success: true, comments });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export const getDashboard = async (req, res) => {
  try {
    const recentBlogs = await Blog.find({}).sort({ createdAt: -1 }).limit(5);
    const blogs = await Blog.countDocuments();
    const recentComments = await comment.find({}).sort({ createdAt: -1 });
    const comments = await comment.countDocuments();

    const drafts = await Blog.countDocuments({ isPublished: false });

    const dashboardData = {
      blogs,
      comments,
      drafts,
      recentBlogs,
    };
    res.json({ success: true, dashboardData });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export const deleteCommentById = async (req, res) => {
  try {
    const { id } = req.body;
    await comment.findByIdAndDelete(id);
    res.json({ success: true, message: "Comment deleted successfully" });
  } catch (error) {}
};

export const approveCommentById = async (req, res) => {
  try {
    const { id } = req.body;
    await comment.findByIdAndUpdate(id, { isApproved: true });

    res.json({ success: true, message: "Comment approved successfully" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};
