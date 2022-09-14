import { Router } from "express";
import { checkHealth } from "./health";

const healthRouter: Router = Router();

healthRouter.get("", checkHealth);

export { healthRouter };
