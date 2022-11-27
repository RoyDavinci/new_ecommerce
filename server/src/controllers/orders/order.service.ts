import { Router } from "express";
import { authenticateJWT, optionalAuthenticate } from "../../common/authenticate";
import * as controller from "./order.controller";
import { validateCreateOrder } from "./order.middlewares";

const orderRouter = Router();

orderRouter.get("/order", authenticateJWT, controller.getAllOrdersForAUser);
orderRouter.post("/create/order", validateCreateOrder, optionalAuthenticate, controller.createOrder);
orderRouter.get("/:id", controller.getSingleOrder);
orderRouter.patch("/:id", controller.updateOrder);

export { orderRouter };
