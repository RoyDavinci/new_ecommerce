import { query, check, param } from "express-validator";
import { validationErrorHandler } from "../../common/validationErrorHandler";

export const validateQueryData = [query("pgnumber").optional().isNumeric().withMessage("invalid pgnumber query string"), query("pgsize").optional().isNumeric().withMessage("invalid pgsize query string"), validationErrorHandler];

export const validateAdminCreateData = [
    check("first_name").stripLow().notEmpty().withMessage("firstname is required").bail().isString().withMessage("invalid firstname format").trim(),
    check("last_name").stripLow().optional({ nullable: false, checkFalsy: true }).isString().withMessage("invalid lastname").trim(),
    check("phone").stripLow().optional({ nullable: false, checkFalsy: true }).isMobilePhone(["en-NG"]).withMessage("invalid nigerian mobile number").trim(),
    check("email").stripLow().notEmpty().withMessage("email is required").bail().isEmail().withMessage("invalid email").trim(),
    validationErrorHandler,
];

export const validateAdminIdParam = [param("id").stripLow().notEmpty().withMessage("id param is required").bail().trim(), validationErrorHandler];

export const validateAdminUpdateData = [
    check("first_name").optional().stripLow().isString().withMessage("invalid firstname format").trim(),
    check("last_name").optional().stripLow().isString().withMessage("invalid lastname").trim(),
    check("phone").optional().stripLow().isMobilePhone(["en-NG"]).withMessage("invalid nigerian mobile number").trim(),
    check("email").optional().stripLow().isEmail().withMessage("invalid email").trim(),
    check("role").optional().stripLow().isString().withMessage("invalid role format").trim(),
    validationErrorHandler,
];
