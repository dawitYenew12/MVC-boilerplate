import express from "express";
const router = express.Router();
import { login, register } from "../controller/auth.controller.js";
import { validate } from "../middleware/validate.js";
import { createUserSchema } from "../validations/user.validation.js";
import { loginSchema } from "../validations/auth.validation.js";

router.post("/auth/register", validate(createUserSchema), register);
router.post("/auth/login", validate(loginSchema), login);

export default router;
