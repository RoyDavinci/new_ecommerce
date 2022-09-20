import { Router } from "express";
import { authenticateJWT, authenticateLocal, authenticateAdminJWT } from "../../common/authenticate";
import * as controller from "./subscribers.controllers";
import * as middleware from "./subscribers.middlewares";

const ssubscriberRouter: Router = Router();

ssubscriberRouter.post("/", controller.getSubscribers);
ssubscriberRouter.patch("/", authenticateAdminJWT, middleware.updateSubCategoryMiddleware, controller.updateSingleSubscriber);
ssubscriberRouter.delete("/delete-subscriber", authenticateAdminJWT, controller.deleteSubscriber);
ssubscriberRouter.get("/blocked-users", controller.getBlockedUsers);
ssubscriberRouter.get("/deleted-users", controller.getDeletedUsers);
ssubscriberRouter.get("/get-user", authenticateJWT, controller.getSingleSubscriber);

export { ssubscriberRouter };
