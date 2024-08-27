import express from 'express';
const router = express.Router();
import {
  login,
  register,
  refreshToken,
} from '../controller/auth.controller.js';
import { validate } from '../middleware/validate.js';
import { createUserSchema } from '../validations/user.validation.js';
import {
  loginSchema,
  refreshTokenSchema,
} from '../validations/auth.validation.js';
import { loginRouteRateLimit } from '../middleware/authLimiter.js';

router.post('/auth/register', validate(createUserSchema), register);
router.post('/auth/login', loginRouteRateLimit, validate(loginSchema), login);
router.post('/auth/refreshToken', validate(refreshTokenSchema), refreshToken);

export default router;
