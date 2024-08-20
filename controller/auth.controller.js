import { catchAsync } from "../utils/catchAsync.js";
import httpStatus from "http-status";
import { createUser } from "../services/user.service.js";
import { generateAuthTokens } from "../services/token.service.js";
import { loginUser } from "../services/auth.service.js";

export const register = catchAsync(async (req, res) => {
  //create user
  const user = await createUser(req.body);
  //generate token
  const tokens = generateAuthTokens(user.id);
  res.status(httpStatus.CREATED).send({ user, tokens });
});

export const login = catchAsync(async (req, res) => {
  let { email, password } = req.body;
  const user = await loginUser(email, password);
  //generate token
  const tokens = generateAuthTokens(user.id);
  res.status(httpStatus.OK).send({ user, tokens });
});
