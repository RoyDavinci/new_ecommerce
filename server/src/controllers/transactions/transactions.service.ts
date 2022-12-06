import { Router } from "express";
import * as controller from "./transactions.controllers";

const transactionRouter: Router = Router();

transactionRouter.post("/start-transaction/:orderId", controller.startTransaction);
transactionRouter.post("/verify-transaction/:transactionId", controller.verifyTransaction);

export { transactionRouter };
