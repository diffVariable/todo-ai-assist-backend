import express from "express";
import cors from "cors";
import "dotenv/config";
import braindumpRouter from "./routes/braindump";
import tasksRouter from "./routes/tasks";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/braindump", braindumpRouter);
app.use("/api/tasks", tasksRouter);
export default app;
