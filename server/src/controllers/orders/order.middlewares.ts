import { check } from "express-validator";
import { validationErrorHandler } from "../../common/validationErrorHandler";

export const validateCreateOrder = [
    check("product_details").isArray().withMessage("product_details must be an array").notEmpty(),
    check("phone").stripLow().notEmpty().withMessage("phone is required").bail().isMobilePhone(["en-NG"]).withMessage("invalid nigerian mobile").trim(),
    check("name").stripLow().notEmpty().withMessage("name is required").bail().isString().withMessage("name should be string").trim(),
    check("address").stripLow().notEmpty().withMessage("address is required").bail().isString().withMessage("address should be string").trim(),
    check("payment_type").stripLow().notEmpty().withMessage("payment_type is required").bail().isString().withMessage("payment_type should be string").trim(),
    check("delivery_type").stripLow().notEmpty().withMessage("delivery_type is required").bail().isString().withMessage("delivery_type should be string").trim(),
    check("quantity").stripLow().notEmpty().withMessage("quantity is required").bail().isString().withMessage("quantity should be string").trim(),
    check("email").notEmpty().withMessage("email is required").bail().isEmail().withMessage("invalid email format").trim(),
    validationErrorHandler,
];
