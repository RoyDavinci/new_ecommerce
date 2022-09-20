import { query, check, param } from "express-validator";
import { validationErrorHandler } from "../../common/validationErrorHandler";

export const createCategoryMiddleware = [check("name").isString().withMessage("name must be string").notEmpty().withMessage("")];
