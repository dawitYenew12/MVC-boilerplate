import joi from 'joi';
import dotenv from 'dotenv';
dotenv.config();

const envVarSchema = joi.object({
    DB_URI: joi.string().required(),
    PORT: joi.number().positive().required(),
}).unknown();

const { error, value: envVars } = envVarSchema.validate(process.env);

if (error) {
    console.log(error)
}

export default {
    port: envVars.PORT,
    dbUri: envVars.DB_URI,
};