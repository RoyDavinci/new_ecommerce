import { check, param, query } from "express-validator";
import config from "../../config";
import { validationErrorHandler } from "../../common/validationErrorHandler";

export const validateCreateShipperData = [
    check("businessName").notEmpty().withMessage("business name is required").isString().withMessage("business name must be string"),
    check("businessType").notEmpty().withMessage("businessType is required").isString().withMessage("businessType  must be string"),
    check("shopAddress").notEmpty().withMessage("shopAddress is required").isString().withMessage("shopAddress must be string"),
    check("phone").notEmpty().withMessage("phone is required").isString().withMessage("phone must be string"),
    check("homeAddress").notEmpty().withMessage("homeAddress is required").isString().withMessage("homeAddress must be string"),
    check("email").notEmpty().withMessage("email is required").isString().withMessage("email must be string").isEmail().withMessage("value must be email"),
    check("first_name").optional().isString().withMessage("first_name must be string"),
    check("password").optional().isString().withMessage("last_name must be string"),
    check("username").optional().isString().withMessage("username must be string"),
    validationErrorHandler,
];
export const validateUpdateShipperData = [
    check("businessName").notEmpty().withMessage("business name is required").isString().withMessage("business name must be string"),
    check("businessType").notEmpty().withMessage("businessType is required").isString().withMessage("businessType  must be string"),
    check("shopAddress").notEmpty().withMessage("shopAddress is required").isString().withMessage("shopAddress must be string"),
    check("phone").notEmpty().withMessage("phone is required").isString().withMessage("phone must be string"),
    check("homeAddress").notEmpty().withMessage("homeAddress is required").isString().withMessage("homeAddress must be string"),
    check("email").notEmpty().withMessage("email is required").isString().withMessage("email must be string").isEmail().withMessage("value must be email"),
    check("first_name").optional().isString().withMessage("first_name must be string"),
    check("password").optional().isString().withMessage("last_name must be string"),
    check("username").optional().isString().withMessage("username must be string"),
    validationErrorHandler,
];

export const validatedGetSellerData = [param("param").notEmpty().withMessage("param is required for update"), validationErrorHandler];
