import { Schema, model } from "mongoose";
import { ISubtask, ITask, TASK_STATUS } from "../types";

interface ITaskDocument extends ITask, Document {}

const SubtaskSchema = new Schema<ISubtask>({
  title: { type: String, required: true },
  description: { type: String, required: false },
  status: {
    type: String,
    enum: Object.values(TASK_STATUS),
    default: TASK_STATUS.TODO,
  },
});

const TaskDocumentSchema = new Schema<ITaskDocument>({
  title: { type: String, required: true },
  description: { type: String, required: false },
  status: {
    type: String,
    enum: Object.values(TASK_STATUS),
    default: TASK_STATUS.TODO,
  },
  isOverwhelming: { type: Boolean, required: true },
  subtasks: { type: [SubtaskSchema], required: false },
});

export const Task = model<ITaskDocument>("Task", TaskDocumentSchema);
