import { Router } from "express";
import { authenticateJWT, authenticateLocal, authenticateAdminJWT } from "../../common/authenticate";
import * as controller from "./category.controllers";
import multer from "multer";

const fileUpload = multer();
const categoryRouter = Router();

categoryRouter.post("/", authenticateJWT, fileUpload.single("image"), controller.createCatrgory);
categoryRouter.delete("/:id", authenticateAdminJWT, controller.deleteCategory);
categoryRouter.patch("/:id", authenticateAdminJWT, fileUpload.single("image"), controller.updateCategories);
categoryRouter.get("/", controller.getCategories);
categoryRouter.get("/:id", controller.getCategory);
categoryRouter.get("/name/:name", controller.getCategoryByName);

export { categoryRouter };
