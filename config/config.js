import dotenv from 'dotenv';
dotenv.config();
import envVarSchema from './../validations/env.validation.js';

const { error, value: envVars } = envVarSchema.validate(process.env);
if (error) {
    logger.error(error)
}

export default {
    port: envVars.PORT,
    dbUri: envVars.DB_URI,
    env: envVars.NODE_ENV,
};