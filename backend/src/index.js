import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";


import authRoutes from "../src/routes/auth.routes.js";
import problemRoutes from "./routes/problem.routes.js";
import executionRoute from "./routes/executeCode.routes.js";
import submissionRoutes from "./routes/submission.routes.js";
import playlistRoutes from "./routes/playlist.routes.js";


dotenv.config();

const app = express();

const PORT = process.env.PORT || 8080

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);


app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello Guys welcome to leetlab🔥  ");
});


app.use("/api/v1/auth" , authRoutes);
app.use("/api/v1/problems", problemRoutes);
app.use("/api/v1/execute-code", executionRoute);
app.use("/api/v1/submission", submissionRoutes);
app.use("/api/v1/playlist",playlistRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})