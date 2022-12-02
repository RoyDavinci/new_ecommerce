import { Router } from "express";
import * as controller from "./transactions.controllers";

const transactionRouter: Router = Router();

transactionRouter.post("/start-transaction/:orderId", controller.startTransaction);

export { transactionRouter };
