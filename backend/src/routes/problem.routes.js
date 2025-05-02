import express from 'express'
import { authMiddleware, checkAdmin } from '../middleware/auth.middleware.js';
import { createProblem, deleteProblem, getAllProblemsSolvedByUser, getProblemById, updatedProblem } from '../controllers/problem.controller.js';


const problemRoutes = express.Router();

problemRoutes.post("/create-problem", authMiddleware ,checkAdmin , createProblem )

problemRoutes.post("/get-all-problems", authMiddleware , getAllProblemsSolvedByUser)

problemRoutes.post("/get-problem/:id",authMiddleware,getProblemById);

problemRoutes.get("/update-problem/:id", authMiddleware , checkAdmin , updatedProblem )

problemRoutes.delete("/delete-problem/:id" , authMiddleware , checkAdmin , deleteProblem)

problemRoutes.get("/get-solved-problems",authMiddleware , getAllProblemsSolvedByUser);

export default problemRoutes;