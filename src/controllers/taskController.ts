import { Request, Response } from "express";
import {
  createTaskService,
  getAllTasksByIdService,
  getTaskByIdsService,
} from "../services/taskService";
import { prisma } from "../utils/prisma";
import { checkUserExists } from "../utils/helpers";

const createTask = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { title, description, status, priority } = req.body;
  try {
    const userExists = await checkUserExists(Number(userId), res);
    if (!userExists) return;

    if (
      ![title, description, status, priority].every(
        (value: any): value is string => typeof value === "string"
      )
    ) {
      res.status(400).json({ status: 400, message: "Invalid input types" });
      return;
    }

    const task = { title, description, status, priority };
    const createdTask = await createTaskService(Number(userId), task);

    res.status(201).json({ status: 201, task: createdTask });
  } catch (err) {
    res.status(500).json({ status: 500, error: err });
  }
};

const getAllTasksById = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const userExists = await checkUserExists(Number(userId), res);
    if (!userExists) return;

    const tasks = await getAllTasksByIdService(Number(userId));

    res.status(200).json({ status: 200, tasks });
  } catch (err) {
    res.status(500).json({ status: 500, error: err });
  }
};

const getTaskByIds = async (req: Request, res: Response) => {
  const { userId, taskId } = req.params;
  try {
    const userExists = await checkUserExists(Number(userId), res);
    if (!userExists) return;

    const task = await getTaskByIdsService(Number(userId), Number(taskId));

    res.status(200).json({ status: 200, task });
  } catch (err) {
    res.status(500).json({ status: 500, error: err });
  }
};

export { createTask, getAllTasksById, getTaskByIds };
