import joi from 'joi';
import { objectIdValidate } from './custom.validation.js';

export const createBlogSchema = {
  body: joi.object().keys({
    title: joi.string().required(),
    content: joi.string().required(),
    createdBy: joi.string().custom(objectIdValidate).required(),
    coverImage: joi.string(),
  }),
};

export const getBlogSchema = {
  body: joi.object().keys({
    userId: joi.string().custom(objectIdValidate).required(),
  }),
};
