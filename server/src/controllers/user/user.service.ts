import { Router } from "express";
import * as controller from "./user.controller";

const userRouter: Router = Router();
userRouter.post("/", controller.createUser);
userRouter.get("/", controller.getAllUsers);
userRouter.get("/:id", controller.getSingleUser);
userRouter.delete("/:id", controller.deleteUser);
userRouter.patch("/:id", controller.updateUser);

export { userRouter };
