import joi from "joi";

export const createBlogSchema = {
  body: joi.object().keys({
    title: joi.string().required(),
    content: joi.string().required(),
  }),
};
