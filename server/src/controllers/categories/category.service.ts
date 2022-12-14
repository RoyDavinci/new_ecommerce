import { Router } from "express";
import { authenticateJWT, authenticateLocal, authenticateAdminJWT } from "../../common/authenticate";
import * as controller from "./category.controllers";

const categoryRouter = Router();

categoryRouter.post("/", authenticateJWT, controller.createCatrgory);
categoryRouter.delete("/:id", authenticateAdminJWT, controller.deleteCategory);
categoryRouter.patch("/:id", authenticateAdminJWT, controller.updateCategories);
categoryRouter.get("/", controller.getCategories);
categoryRouter.get("/:id", controller.getCategory);

export { categoryRouter };
