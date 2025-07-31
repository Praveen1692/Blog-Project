import { format } from "path";
import imagekit from "../configs/imagekit.js";
import Blog from "../models/Blog.js";
import fs from "fs";
import comment from "../models/Comments.js";

export const addBlog = async (req, res) => {
  try {
    const { title, subTitle, description, category, isPublished } = JSON.parse(
      req.body.blog
    );

    const imageFile = req.file;

    // check all fields are present
    if (!title || !subTitle || !description || !category || !imageFile) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all fields" });
    }

    const fileBuffer = fs.readFileSync(imageFile.path);

    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/blogs",
    });

    // optimization through imagekit URL transformation
    const optimizedImageUrl = imagekit.url({
      path: response.filePath,
      transformations: [
        {
          quality: "auto",
        },
        { format: "webp" },
        { width: "1280" },
      ],
    });

    const image = optimizedImageUrl;

    await Blog.create({
      title,
      subTitle,
      description,
      category,
      image,
      isPublished,
    });
    return res
      .status(201)
      .json({ success: true, message: "Blog added successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const getBlog = async (req, res) => {
  try {
    const blog = await Blog.find({ isPublished: true });
    return res.json({ success: true, blog });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const { blogId } = req.params;

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.json({ success: false, message: "Blog not found" });
    }
    return res.json({ success: true, blog });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const deleteBlogById = async (req, res) => {
  try {
    const { id } = req.body;

    await Blog.findByIdAndDelete(id);

    return res.json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const togglePublish = async (req, res) => {
  try {
    const { id } = req.body;

    const blog = await Blog.findById(id);
    blog.isPublished = !blog.isPublished;
    await blog.save();
    return res.json({ success: true, message: "Blog update successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const addComment = async () => {
  try {
    const { blog, name, content } = req.body;
    await comment.create({
      blog,
      name,
      content,
    });
    return res.json({ success: true, message: "Comment added successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const getBlogComments = async (req, res) => {
  try {
    const { blogId } = req.body;

    const comments = await Comment.find({
      blog: blogId,
      isApproved: true,
    }).sort({ createdAt: -1 });
    return res.json({ success: true, comments });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
