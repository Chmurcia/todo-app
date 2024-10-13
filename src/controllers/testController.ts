import { Request, Response } from "express";
import { getTestMessage } from "../services/testService";

const getTest = (req: Request, res: Response) => {
  const message = getTestMessage();
  res.status(200).json(message);
};

export { getTest };
