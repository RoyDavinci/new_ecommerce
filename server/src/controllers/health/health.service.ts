import { Router } from "express";
import { checkHealth, testing } from "./health";

const healthRouter: Router = Router();

healthRouter.get("", checkHealth);
healthRouter.get("/test", testing);

export { healthRouter };
