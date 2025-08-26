import { Router } from "express";
import validateRequest from "../middleware/blog.validation.middleware.js";
import { registerUserValidation } from "../validation/user.validation.js";
import {
  deleteUser,
  loginUser,
  logoutUser,
  registerUser,
  updatePassword,
  updateProfile,
} from "../controllers/user.controllers.js";

import{authenticate}  from "../middleware/auth.middleware.js"

const userRouter = Router();

userRouter.post("/register",validateRequest(registerUserValidation),registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", authenticate , logoutUser);
userRouter.patch("/edit-profile", authenticate , updateProfile);
userRouter.patch("/edit-password",authenticate,updatePassword);
userRouter.delete("/delete/:id",authenticate, deleteUser);


export default userRouter;