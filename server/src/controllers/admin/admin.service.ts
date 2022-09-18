import { Router } from "express";
import { authenticateJWT, authenticateLocal, authenticateAdminJWT } from "../../common/authenticate";
import * as controller from "./admin.controllers";
import * as middleware from "./admin.middlewares";

const adminRouter: Router = Router();

adminRouter.post("/create-admin", middleware.validateAdminCreateData, controller.createNewAdmin);
adminRouter.patch("/update-admin", middleware.validateAdminUpdateData, controller.updateAdmin);
adminRouter.get("/", controller.getAllAdmins);
adminRouter.get("/get-admin", authenticateAdminJWT, controller.getSingleAdmin);
adminRouter.delete("/delete-admin", authenticateAdminJWT, controller.deleteAdmin);

export { adminRouter };
