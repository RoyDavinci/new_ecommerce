import { Router } from "express";
import { authenticateJWT, authenticateLocal } from "../../common/authenticate";
import * as controller from "./auth.controller";
import * as middleware from "./auth.validators";

const userRouter: Router = Router();
userRouter.post("/", middleware.validateSignupData, controller.createUser);
userRouter.get("/", controller.getAllUsers);
userRouter.get("/:id", controller.getSingleUser);
userRouter.delete("/delete", authenticateJWT, controller.deleteUser);
userRouter.post("/signin", middleware.validateSigninData, authenticateLocal, controller.signIn);
userRouter.post("/check-otp", middleware.validateOTPData, controller.confirmOtp);
userRouter.post("/forgot-password", middleware.validateForgetPasswordData, controller.forgotPassword);

export { userRouter };
