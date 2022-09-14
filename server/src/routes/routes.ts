import { Router } from "express";
import { healthRouter, userRouter } from "../controllers";

const apiV1Router: Router = Router();

apiV1Router.use("/user", userRouter);
apiV1Router.get("/", healthRouter);

export default apiV1Router;
