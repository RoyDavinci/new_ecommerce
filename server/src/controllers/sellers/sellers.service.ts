import { uploadSingle } from "../../common/multer";
import { Router } from "express";
import { authenticateJWT } from "../../common/authenticate";
import * as controller from "./sellers.controllers";
import * as middleware from "./sellers.middlewares";

const sellerRouter = Router();

sellerRouter.post("/", uploadSingle, middleware.validateCreateShipperData, controller.createNewSeller);
sellerRouter.delete("/:id", authenticateJWT, middleware.validatedGetSellerData, controller.deleteSeller);
sellerRouter.patch("/:id", authenticateJWT, middleware.validateUpdateShipperData, controller.updateSeller);
sellerRouter.get("/", authenticateJWT, controller.getSellers);
sellerRouter.get("/:id", authenticateJWT, controller.getSeller);

export { sellerRouter };
