import { Router } from "express";
import { adminRouter, userRouter } from "../controllers";

const apiV1Router: Router = Router();

apiV1Router.use("/user", userRouter);
apiV1Router.use("/admin", adminRouter);

export default apiV1Router;
