import { Router } from "express";
import { optionalAuthenticate } from "../../common/authenticate";
import * as controller from "./order.controller";

const orderRouter = Router();

orderRouter.post("/create/order", optionalAuthenticate, controller.createOrder);
orderRouter.get("/:id", controller.getSingleOrder);
orderRouter.patch("/:id", controller.updateOrder);

export { orderRouter };
