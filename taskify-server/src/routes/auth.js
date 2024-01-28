import express from "express";
import {
  userLoginValidator,
  userRegisterValidator,
} from "../validators/auth.js";
import { validate } from "../validators/validate.js";
import { loginUser, logoutUser, registerUser } from "../controlller/auth.js";
import { verifyToken } from "../middlewares/auth.js";

const authRoutes = express.Router();

authRoutes.post("/register", userRegisterValidator(), validate, registerUser);
authRoutes.post("/login", userLoginValidator(), validate, loginUser);
authRoutes.post("/logout", verifyToken, logoutUser);

export default authRoutes;
