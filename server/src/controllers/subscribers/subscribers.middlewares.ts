import { query, check, param } from "express-validator";
import { validationErrorHandler } from "../../common/validationErrorHandler";

export const updateSubCategoryMiddleware = [
    check("username").notEmpty().withMessage("name is required").isString().withMessage("sub category must be an array of strings"),
    check("email").notEmpty().withMessage("name is required").isEmail().withMessage("sub category must be an array of strings"),
    check("phone").notEmpty().withMessage("name is required").isString().withMessage("sub category must be an array of strings"),
    validationErrorHandler,
];
