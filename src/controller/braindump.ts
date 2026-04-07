import OpenAI from "openai";
import type { Request, Response } from "express";
import { SYSTEM_PROMPT } from "./prompts";
import { ITask } from "../types";
import { Task } from "../models";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const processBrainDumpWithAI = async (req: Request, res: Response) => {
  const { rawInput } = req.body as { rawInput: string };

  if (!rawInput || typeof rawInput !== "string") {
    res.status(400).json({ error: "rawInput is required" });
    return;
  }

  if (rawInput.length > 1000) {
    res
      .status(400)
      .json({ error: "Input too long — keep it under 1000 characters" });
    return;
  }

  try {
    const response = await client.responses.create({
      model: "gpt-5.4-nano",
      instructions: SYSTEM_PROMPT,
      input: rawInput,
    });

    const cleanJson = response.output_text.trim();
    const tasks: ITask[] = JSON.parse(cleanJson).tasks;
    console.log("returned by api", tasks);
    const saveTasks = await Task.insertMany(tasks);
    res.status(201).json({ tasks: saveTasks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "AI Parsing failed." });
  }
};
