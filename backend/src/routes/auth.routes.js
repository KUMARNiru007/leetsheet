import express from "express";
import {
  userRegistrationvalidator,
  userLoginValidator,
} from '../validators/index.js';
import {register ,login , logout , check, verifyUser, refreshToken } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";


const authRoutes = express.Router();

authRoutes.post("/register",userRegistrationvalidator(), register)
authRoutes.post("/login",userLoginValidator() ,login)
authRoutes.get("/refreshTokens", refreshToken);
authRoutes.post("/logout",authMiddleware , logout)
authRoutes.get("/verifyMail/:token",verifyUser)
authRoutes.get("/check" ,authMiddleware,check)



export default authRoutes ;