import { Router } from "express";
import { authenticateJWT } from "../../common/authenticate";
import * as controller from "./sellers.controllers";

const sellerRouter = Router();

sellerRouter.post("/", controller.createNewSeller);
sellerRouter.delete("/:id", authenticateJWT, controller.deleteSeller);
sellerRouter.patch("/:id", authenticateJWT, controller.updateSeller);

export { sellerRouter };
