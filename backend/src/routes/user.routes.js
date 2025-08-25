import express from "express";
import { authMiddleware, checkAdmin } from "../middleware/auth.middleware.js";
import { getAllUsers, getActiveUsers } from "../controllers/user.controller.js";

const userRoutes = express.Router();

// Admin-only routes
userRoutes.get("/", authMiddleware, checkAdmin, getAllUsers);
userRoutes.get("/active", authMiddleware, checkAdmin, getActiveUsers);

export default userRoutes;


