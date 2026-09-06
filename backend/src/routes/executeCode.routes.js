import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import {
  runCode,
  submitCode,
  legacyExecuteCode,
} from "../controllers/executeCode.controller.js";
import { executeCodeValidator, validateRequest } from "../validators/index.js";

const executionRoute = express.Router();

executionRoute.post("/run", authMiddleware, executeCodeValidator(), validateRequest, runCode);
executionRoute.post("/submit", authMiddleware, executeCodeValidator(), validateRequest, submitCode);
executionRoute.post("/", authMiddleware, executeCodeValidator(), validateRequest, legacyExecuteCode);

export default executionRoute;