import { Router } from "express";
import * as middleware from "./shipper.middlewares";
import * as controller from "./shipper.controllers";
import { authenticateJWT } from "../../common/authenticate";

const shipperRouter = Router();

shipperRouter.post("/create-shipper", authenticateJWT, middleware.validateCreateShippingData, controller.addNewShippers);
shipperRouter.get("/get-shipping", controller.getAllShipping);
shipperRouter.patch("/update-shipping", middleware.validateUpdateShippingData, controller.updateShipping);
shipperRouter.delete("/delete-shipping", middleware.validatedeleteShippingData, controller.deleteShipping);
shipperRouter.get("/shipping/:id", middleware.validatedeleteShippingData, controller.getSingleShipper);

export { shipperRouter };
