import express from "express";
const router = express.Router();
import { getBlogs, createBlog } from "../controller/blog.controller.js";
import { validate } from './../middleware/validate.js';
import { createBlogSchema } from "../validations/blog.validation.js";


router.get("/blogs", getBlogs);
router.post("/blog", validate(createBlogSchema), createBlog);

export default router;