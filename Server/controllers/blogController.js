import { format } from "path";
import imagekit from "../configs/imagekit.js";
import Blog from "../models/Blog.js";
import fs from "fs";

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
