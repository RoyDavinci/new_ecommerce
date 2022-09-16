import { Router } from "express";
import { authenticateJWT, authenticateLocal } from "../../common/authenticate";
import * as controller from "./user.controller";

const userRouter: Router = Router();
userRouter.post("/", controller.createUser);
userRouter.get("/", controller.getAllUsers);
userRouter.get("/:id", controller.getSingleUser);
userRouter.delete("/delete", authenticateJWT, controller.deleteUser);
userRouter.patch("/update", controller.updateUser);
userRouter.post("/signin", authenticateLocal, controller.signIn);

export { userRouter };
