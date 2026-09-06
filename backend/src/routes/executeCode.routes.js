import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import {
  runCode,
  submitCode,
  legacyExecuteCode,
} from "../controllers/executeCode.controller.js";

const executionRoute = express.Router();

executionRoute.post("/run", authMiddleware, runCode);
executionRoute.post("/submit", authMiddleware, submitCode);
executionRoute.post("/", authMiddleware, legacyExecuteCode);

export default executionRoute;