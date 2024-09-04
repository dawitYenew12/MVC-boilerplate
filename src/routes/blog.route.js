import express from 'express';
const router = express.Router();
import {
  getRecentBlogs,
  createBlog,
  uploadFile,
  getFile,
  searchBlog,
} from '../controller/blog.controller.js';
import { validate } from './../middleware/validate.js';
import { createBlogSchema } from '../validations/blog.validation.js';
import { auth } from '../middleware/auth.js';
import upload from '../utils/multer.js';
import recentBlogCache from '../middleware/cache/recent-blogs.js';

router.get('/blogs', recentBlogCache, getRecentBlogs);
router.post('/blog', auth, validate(createBlogSchema), createBlog);
router.post('/blog/cover-image', auth, upload.single('coverImage'), uploadFile);
router.get('/blog/cover-image/:fileName', auth, getFile);
router.get('/blog/search', auth, searchBlog);

export default router;
