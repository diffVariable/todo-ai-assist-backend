import { Router } from "express";
import { processBrainDumpWithAI } from "../controller/braindump";

const router = Router();

router.post("/", processBrainDumpWithAI);

export default router;
