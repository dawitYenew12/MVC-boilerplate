import dotenv from 'dotenv';
dotenv.config();
import envVarSchema from './../validations/env.validation.js';

const { error, value: envVars } = envVarSchema.validate(process.env);
if (error) {
    console.log(error)
}

export default {
    port: envVars.PORT,
    dbUri: envVars.DB_URI,
    env: envVars.NODE_ENV,
};