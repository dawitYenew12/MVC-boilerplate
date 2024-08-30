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
import { emailVerification } from '../controller/auth.controller.js';

router.post('/auth/register', validate(createUserSchema), register);
router.post('/auth/login', loginRouteRateLimit, validate(loginSchema), login);
router.post('/auth/refreshToken', validate(refreshTokenSchema), refreshToken);
router
  .route('/auth/verifyEmail')
  .get(emailVerification)
  .patch(emailVerification);

export default router;
