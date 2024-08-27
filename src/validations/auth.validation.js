import joi from 'joi';

export const loginSchema = {
  body: joi.object().keys({
    email: joi.string().email().required(),
    password: joi.string().required(),
  }),
};

export const refreshTokenSchema = {
  body: joi.object().keys({
    refreshToken: joi.string().required(),
  }),
};

const authValidation = {
  loginSchema,
  refreshTokenSchema,
};

export default authValidation;
