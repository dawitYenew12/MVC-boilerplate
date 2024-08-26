import joi from 'joi';
import { passwordValidate } from './custom.validation.js';

export const createUserSchema = {
    body: joi.object().keys({
        name: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.custom(passwordValidate).required(),
    })
}

