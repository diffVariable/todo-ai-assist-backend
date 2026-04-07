import { Request, Response } from "express";
import { Task } from "../models";
import { TASK_STATUS } from "../types";
export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "error fetching" });
  }
};

export const addTask = async (req: Request, res: Response) => {
  const { title, description, subtasks } = req.body;
  if (!title || !description) {
    res.status(400).json({ error: "Title and Description are required." });
  }

  try {
    const task = await Task.create({
      title,
      description,
      isOverwhelming: !!subtasks,
      subtasks,
      status: TASK_STATUS.TODO,
    });

    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "failure to save in DB" });
  }
};

export const patchTask = async (req: Request, res: Response) => {
  const updates = req.body;

  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { returnDocument: "after", runValidators: true },
    );

    if (!task) {
      res.status(404).json({ error: "Task not found" });
      return;
    }
    res.status(200).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update" });
  }
};
