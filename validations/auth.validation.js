import joi from 'joi';

export const loginSchema = {
    body: joi.object().keys({
        email: joi.string().email().required(),
        password: joi.string().required(),
    })
}