import { Request, Response } from "express";
import { helloWorld as helloWorldService } from "../services/hello-world";

export const helloWorld = async (_req: Request, res: Response) => {
  try {
    const response = await helloWorldService();
    res.json(response);
  } catch (e) {
    console.error(e);
  }
};
