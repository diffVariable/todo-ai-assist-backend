import { Router } from "express";
import {
  patchTaskStatus,
  updateTasks,
  getTasks,
  addTask,
} from "../controller/tasks";

const router = Router();

router.get("/", getTasks);

router.patch("/:id", patchTaskStatus);

router.put("/:id", updateTasks);

router.post("/:id", addTask);

export default router;
