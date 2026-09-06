import "./utils/passport.js";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import passport from 'passport';
import pgSession from 'connect-pg-simple';
import session from 'express-session';


import authRoutes from "../src/routes/auth.routes.js";
import problemRoutes from "./routes/problem.routes.js";
import executionRoute from "./routes/executeCode.routes.js";
import submissionRoutes from "./routes/submission.routes.js";
import playlistRoutes from "./routes/playlist.routes.js";
import userRoutes from "./routes/user.routes.js";




dotenv.config();
const app = express();

// Trust the reverse proxy (Render/Vercel) so req.protocol and secure cookies work
app.set("trust proxy", process.env.NODE_ENV === "production" ? 1 : 0);

const PORT = process.env.PORT || 8080

const isProduction = process.env.NODE_ENV === 'production';

const pgStore = pgSession(session);

const ALLOWED_URLS = (process.env.FRONTEND_URL || "")
  .split(",")
  .map((url) => url.trim())
  .filter(Boolean);

// Allow the deployed frontend (its apex + www subdomain) plus localhost,
// while still letting server-to-server/curl requests through (no Origin).
function isAllowedOrigin(origin) {
  if (!origin) return true;
  if (ALLOWED_URLS.length === 0) return !isProduction;

  let hostname;
  try {
    hostname = new URL(origin).hostname;
  } catch {
    return false;
  }

  for (const allowed of ALLOWED_URLS) {
    try {
      const allowedHost = new URL(allowed).hostname;
      if (hostname === allowedHost || hostname === `www.${allowedHost}`) {
        return true;
      }
    } catch {
      /* ignore malformed ALLOWED_URLS entry */
    }
  }

  // Let local development reach the API regardless of port.
  return hostname === "localhost" || hostname === "127.0.0.1";
}

app.use(
  cors({
    origin(origin, callback) {
      if (isAllowedOrigin(origin)) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: isProduction
      ? new pgStore({
          conString: process.env.DATABASE_URL,
          tableName: 'user_sessions',
          createTableIfMissing: true,
        })
      : undefined,
    cookie: {
      secure: isProduction,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      sameSite: isProduction ? 'none' : 'lax',
      domain: process.env.COOKIE_DOMAIN || undefined,
    },
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("Hello Guys welcome to leetsheet🔥  ");
});


app.use("/api/v1/auth" , authRoutes);
app.use("/api/v1/problems", problemRoutes);
app.use("/api/v1/execute-code", executionRoute);
app.use("/api/v1/submission", submissionRoutes);
app.use("/api/v1/playlist",playlistRoutes)
app.use("/api/v1/users", userRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})