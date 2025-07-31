import express from "express";
import { addBlog } from "../controllers/blogController.js";

const blogRouter = express.Router();

blogRouter.post("/", addBlog);

export default blogRouter;
