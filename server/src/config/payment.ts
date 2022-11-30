import joi from "joi";

/**
 * Generate a validation schema using joi to check the type of your environment variables
 */

const envSchema = joi.object({
    PAYSTACK_SECRET: joi.string(),
    PAYSTACK_PUBLIC: joi.string(),
});

/**
 * Validate the env variables using joi.validate()
 */
const { error, value: envVars } = envSchema.validate(process.env);
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const config = {
    payment: {
        PAYSTACK_SECRET: envVars.PAYSTACK_SECRET,
        PAYSTACK_PUBLIC: envVars.PAYSTACK_PUBLIC,
    },
};

export default config;
