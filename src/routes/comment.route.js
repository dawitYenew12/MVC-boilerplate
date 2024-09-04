import express from 'express';

const router = express.Router();
import { addComment } from '../controller/comment.controller.js';
import { auth } from '../middleware/auth.js';

router.post('/comment', auth, addComment);

export default router;
