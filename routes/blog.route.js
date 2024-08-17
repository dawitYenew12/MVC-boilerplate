import express from "express";
const router = express.Router();
import { getBlogs, createBlog } from "../controller/blog.controller.js";

router.get("/blogs", getBlogs);
router.post("/blog", createBlog);

export default router;