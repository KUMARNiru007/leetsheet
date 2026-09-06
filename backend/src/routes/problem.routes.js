import express from 'express'
import { authMiddleware, checkAdmin } from '../middleware/auth.middleware.js';
import { createProblem, deleteProblem, getAllProblems, getAllProblemsSolvedByUser, getProblemById, updateProblem } from '../controllers/problem.controller.js';
import { createAndUpdateProblemValidator, validateRequest } from '../validators/index.js';


const problemRoutes = express.Router();

problemRoutes.post("/create-problem", authMiddleware, checkAdmin, createAndUpdateProblemValidator(), validateRequest, createProblem)

problemRoutes.get("/get-all-problems", authMiddleware, getAllProblems)

problemRoutes.get("/get-problem/:id", authMiddleware, getProblemById);

problemRoutes.put("/update-problem/:id", authMiddleware, checkAdmin, createAndUpdateProblemValidator(), validateRequest, updateProblem)

problemRoutes.delete("/delete-problem/:id", authMiddleware, checkAdmin, deleteProblem)

problemRoutes.get("/get-solved-problems", authMiddleware, getAllProblemsSolvedByUser);

export default problemRoutes;