import joi from 'joi';
import ApiError from '../utils/ApiError.js';

export const validate = (schema) => (req, res, next) => {
  const keys = Object.keys(schema);

  const reducedObject = keys.reduce((obj, key) => {
    if (Object.prototype.hasOwnProperty.call(req, key)) {
      obj[key] = req[key];
    }
    return obj;
  }, {});
  const { value, error } = joi.compile(schema).validate(reducedObject);

  if (error) {
    const errors = error.details.map((detail) => detail.message).join(',');
    next(new ApiError(400, errors));
  }

  return next();
};
