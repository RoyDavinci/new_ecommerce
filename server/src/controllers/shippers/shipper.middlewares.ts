import { check, param, query } from "express-validator";
import config from "../../config";
import { validationErrorHandler } from "../../common/validationErrorHandler";

export const validateCreateShippingData = [
    check("name").stripLow().notEmpty().withMessage("name must be included").bail().isString().withMessage("name must be string").trim(),
    check("contact").stripLow().notEmpty().withMessage("contact must be included").bail().isString().withMessage("contact must be string").trim(),
    check("price").stripLow().notEmpty().withMessage("price must be included").bail().isString().withMessage("price must be string").trim(),
    check("places").notEmpty().withMessage("places must be included").bail().isArray().withMessage("places must be an array"),
    check("lagos").stripLow().notEmpty().withMessage("lagos must be included").bail().isBoolean().withMessage("lagos must be a boolean"),
    validationErrorHandler,
];
export const validateUpdateShippingData = [
    check("name").stripLow().notEmpty().withMessage("name must be included").bail().isString().withMessage("name must be string").trim(),
    check("contact").stripLow().notEmpty().withMessage("contact must be included").bail().isString().withMessage("contact must be string").trim(),
    check("price").stripLow().notEmpty().withMessage("price must be included").bail().isString().withMessage("price must be string").trim(),
    check("places").notEmpty().withMessage("places must be included").bail().isArray().withMessage("places must be an array"),
    check("lagos").stripLow().notEmpty().withMessage("lagos must be included").bail().isBoolean().withMessage("lagos must be a boolean"),
    check("param").notEmpty().withMessage("param is required for update"),
    validationErrorHandler,
];
export const validatedeleteShippingData = [check("param").notEmpty().withMessage("param is required for update"), validationErrorHandler];
