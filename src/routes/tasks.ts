import { Router } from "express";
import { getTasks, addTask, patchTask } from "../controller/tasks";

const router = Router();

router.get("/", getTasks);

router.patch("/:id", patchTask);

router.post("/", addTask);

export default router;
