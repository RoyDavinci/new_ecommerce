import { check, param, query } from "express-validator";
import config from "../../config";
import { validationErrorHandler } from "../../common/validationErrorHandler";

export const validateSignupData = [
    check("first_name").stripLow().notEmpty().withMessage("firstname is required").bail().isString().withMessage("invalid firstname format").trim(),
    check("last_name").stripLow().optional({ nullable: false, checkFalsy: true }).isString().withMessage("invalid lastname").trim(),
    check("phone").stripLow().notEmpty().withMessage("phone is required").bail().isMobilePhone(["en-NG"]).withMessage("invalid nigerian mobile").trim(),
    check("email").notEmpty().withMessage("email is required").bail().isEmail().withMessage("invalid email format").trim(),
    check("username").notEmpty().withMessage("username is required").bail().trim(),
    check("password").notEmpty().withMessage("password is required").bail().isLength({ min: 4, max: 50 }).withMessage("min: 4, max:50 password character"),
    validationErrorHandler,
];

export const validateOTPData = [
    check("prospectId").notEmpty().withMessage("prospectId is required").bail().isString().withMessage("invalid prospectId address").bail().isLength({ min: 26, max: 26 }).withMessage("invalid prospectid"),
    check("otp").notEmpty().withMessage("otp is required").bail().isLength({ min: config.server.OTP_LENGTH, max: config.server.OTP_LENGTH }).withMessage("invalid OTP length"),
    validationErrorHandler,
];

export const validateSigninData = [
    check("email").optional({ nullable: false }).isEmail().withMessage("invalid email address").trim(),
    check("mobile").optional({ nullable: false }).isMobilePhone(["en-NG"], { strictMode: true }).withMessage("only supports nigerian numbers"),
    check("password").notEmpty().withMessage("password is required").isLength({ min: 4, max: 50 }).withMessage("min:4, max:50 password length"),
    validationErrorHandler,
];

export const validateForgetPasswordData = [check("email").notEmpty().withMessage("email is needed").isEmail().withMessage("Invalid Email"), validationErrorHandler];

export const validateResetPasswordData = [
    check("password").notEmpty().withMessage("password is required").bail().isLength({ min: 4, max: 50 }).withMessage("min: 4, max:50 password character"),
    param("token").notEmpty().withMessage("token param is required").bail().isJWT().withMessage("invalid token param"),
    validationErrorHandler,
];

export const validateUpdatePasswordData = [check("password").notEmpty().withMessage("password is required").bail().isLength({ min: 4, max: 50 }).withMessage("min: 4, max:50 password character"), validationErrorHandler];
