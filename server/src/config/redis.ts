import joi from "joi";
import dotenv from "dotenv-safe";

dotenv.config();
const envSchema = joi
    .object({
        REDIS: joi.string(),
    })
    .unknown()
    .required();

const { error, value: envVars } = envSchema.validate(process.env);
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const config = {
    redis: {
        REDIS: envVars.REDIS_URL,
    },
};

export default config;
