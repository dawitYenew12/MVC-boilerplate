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
    jwt: {
        secretKey: envVars.JWT_SECRET_KEY,
        accessTokenMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
        refreshTokenDays: envVars.JWT_REFRESS_EXPIRATION_DAYS
    }
};