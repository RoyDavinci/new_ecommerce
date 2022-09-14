import joi from "joi";
import dotenv from "dotenv-safe";

dotenv.config();
const envSchema = joi
    .object({
        DATABASE_URL: joi.string(),
        MODEL_EMAIL_FIELD: joi.string(),
        MODEL_PASSWORD_FIELD: joi.string(),
        AUTH_MODEL_NAME: joi.string(),
        ADMIN_MODEL_NAME: joi.string(),
        AUTO_USERNAME_MODEL_NAME: joi.string(),
        SIGNEDUP_GUEST_MODEL_NAME: joi.string(),
        USER_MODEL_NAME: joi.string(),
    })
    .unknown()
    .required();

const { error, value: envVars } = envSchema.validate(process.env);
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const config = {
    databaseConfig: {
        DATABASE_URL: envVars.DATABASE_URL,
        MODEL_EMAIL_FIELD: envVars.MODEL_EMAIL_FIELD,
        MODEL_PASSWORD_FIELD: envVars.MODEL_PASSWORD_FIELD,
        AUTH_MODEL_NAME: envVars.AUTH_MODEL_NAME,
        ADMIN_MODEL_NAME: envVars.ADMIN_MODEL_NAME,
        AUTO_USERNAME_MODEL_NAME: envVars.AUTO_USERNAME_MODEL_NAME,
        SIGNEDUP_GUEST_MODEL_NAME: envVars.SIGNEDUP_GUEST_MODEL_NAME,
        USER_MODEL_NAME: envVars.USER_MODEL_NAME,
    },
};
export default config;
