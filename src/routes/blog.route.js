import express from 'express';
const router = express.Router();
import {
  getBlogs,
  createBlog,
  uploadFile,
} from '../controller/blog.controller.js';
import { validate } from './../middleware/validate.js';
import {
  createBlogSchema,
  getBlogSchema,
} from '../validations/blog.validation.js';
import { auth } from '../middleware/auth.js';
import upload from '../utils/multer.js';

router.get('/blogs', auth, validate(getBlogSchema), getBlogs);
router.post('/blog', auth, validate(createBlogSchema), createBlog);
router.post('/blog/cover-image', auth, upload.single('coverImage'), uploadFile);

export default router;
