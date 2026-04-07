import OpenAI from "openai";
import type { Request, Response } from "express";
import { SYSTEM_PROMPT } from "./prompts";
import { ITask } from "../types";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const processBrainDumpWithAI = async (req: Request, res: Response) => {
  const { rawInput } = req.body as { rawInput: string };

  if (!rawInput) {
    res.status(400).json({ error: "User Raw Input required." });
  }
  try {
    const response = await client.responses.create({
      model: "gpt-5.4-nano",
      instructions: SYSTEM_PROMPT,
      input: rawInput,
    });

    const cleanJson = response.output_text.trim();
    const tasks: ITask[] = JSON.parse(cleanJson).tasks;
    console.log(tasks);
    res.status(200).json({ tasks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "AI Parsing failed." });
  }
};
