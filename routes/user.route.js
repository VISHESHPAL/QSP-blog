import { Router } from "express";
import validateRequest from "../middleware/blog.validation.middleware.js";
import { registerUserValidation } from "../validation/user.validation.js";
import {
  deleteUser,
  loginUser,
  logoutrUser,
  registerUser,
  updatePassword,
  updateProfile,
} from "../controllers/user.controllers.js";

const userRouter = Router();

userRouter.post(
  "/register",
  validateRequest(registerUserValidation),
  registerUser
);
userRouter.post("/login", loginUser);
userRouter.post("/logout", logoutrUser);
userRouter.patch("/edit-profile", updateProfile);
userRouter.patch("/edit-password", updatePassword);
userRouter.delete("/delete", deleteUser);


export default userRouter;