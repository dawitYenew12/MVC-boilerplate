import joi from 'joi';

const envVarSchema = joi
  .object({
    DB_URI: joi.string().required(),
    PORT: joi.number().positive().required(),
  })
  .unknown();

export default envVarSchema;
