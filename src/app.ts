import express from "express";
import cors from "cors";
import "dotenv/config";
import braindumpRouter from "./routes/braindump";
import tasksRouter from "./routes/tasks";
import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // max 10 requests per window
  message: { error: "Too many requests, please try again later" },
});

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PATCH"],
  }),
);
app.use(express.json());

app.use("/api/braindump", limiter, braindumpRouter);
app.use("/api/tasks", limiter, tasksRouter);

export default app;
