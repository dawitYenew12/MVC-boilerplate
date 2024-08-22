import express from "express";
const router = express.Router();
import { getBlogs, createBlog } from "../controller/blog.controller.js";
import { validate } from './../middleware/validate.js';
import { createBlogSchema } from "../validations/blog.validation.js";
import { auth } from '../middleware/auth.js';

router.get("/blogs", auth, getBlogs);
router.post("/blog", auth, validate(createBlogSchema), createBlog);

export default router;