import { Router } from "express";
import { authenticateJWT, authenticateLocal, authenticateAdminJWT } from "../../common/authenticate";
import * as controller from "./subcategory.controllers";
import * as middleware from "./subcategory.middlewares";

const subCategoryRouter: Router = Router();

subCategoryRouter.post("/", middleware.createSubCategoryMiddleware, controller.createSubCategory);

subCategoryRouter.get("/", controller.getAllSubCategories);
subCategoryRouter.get("/:subCategoryId", middleware.updateSubCategoryMiddleware, controller.getSubCategory);
subCategoryRouter.patch("/:subCategoryId", middleware.updateSubCategoryMiddleware, controller.updateSubCategories);
subCategoryRouter.delete("/:subCategoryId", middleware.deleteSubCategoryMiddleware, controller.deleteSubCategory);

export { subCategoryRouter };
