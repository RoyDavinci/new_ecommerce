import { query, check, param } from "express-validator";
import { validationErrorHandler } from "../../common/validationErrorHandler";

export const createSubCategoryMiddleware = [
    check("name").notEmpty().withMessage("name is required").isArray().withMessage("sub category must be an array of strings"),
    param("categoryId").notEmpty().withMessage("category id is required"),
    validationErrorHandler,
];
export const updateSubCategoryMiddleware = [
    check("name").notEmpty().withMessage("name is required").isArray().withMessage("sub category must be an array of strings"),
    param("subCategoryId").notEmpty().withMessage("category id is required"),
    validationErrorHandler,
];
export const deleteSubCategoryMiddleware = [param("subCategoryId").notEmpty().withMessage("category id is required"), validationErrorHandler];
