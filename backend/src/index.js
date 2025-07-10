import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";


import authRoutes from "../src/routes/auth.routes.js";
import problemRoutes from "./routes/problem.routes.js";


dotenv.config();

const app = express();

const PORT =process.nextTick.PORT || 8080

app.use(
  cors({
    origin:process.env.JUDGE0_API_URL,
    credentials:true,
    methods:['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
    allowedHeaders:['Content-Type','Authorization']
  })
)


app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello Guys welcome to leetlab🔥  ");
});


app.use("/api/v1/auth" , authRoutes);
app.use("/api/v1/problems", problemRoutes);

app.listen(process.env.PORT, () => {
    console.log("Server is running on port 8080 ");
})