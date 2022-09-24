import { uploadSingle } from "../../common/multer";
import { Router } from "express";
import { authenticateJWT } from "../../common/authenticate";
import * as controller from "./sellers.controllers";

const sellerRouter = Router();

sellerRouter.post("/", uploadSingle, controller.createNewSeller);
sellerRouter.delete("/:id", authenticateJWT, controller.deleteSeller);
sellerRouter.patch("/:id", authenticateJWT, controller.updateSeller);
sellerRouter.get("/", authenticateJWT, controller.getSellers);
sellerRouter.get("/:id", authenticateJWT, controller.getSeller);

export { sellerRouter };
