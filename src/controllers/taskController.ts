import { Request, Response } from "express";
import {
  createTaskService,
  getAllTasksByUserIdService,
  getTaskByUserIdTaskIdService,
  replaceTaskByUserIdTaskIdService,
  updateTaskByUserIdTaskIdService,
  deleteTaskByTaskIdService,
} from "../services/taskService";
import { prisma } from "../utils/prisma";
import {
  checkAuthorization,
  checkTaskExists,
  checkUserExists,
} from "../utils/helpers";

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
  } catch (error) {
    res.status(500).json({ status: 500, error });
  }
};

const getAllTasksByUserId = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const userExists = await checkUserExists(Number(userId), res);
    if (!userExists) return;

    const tasks = await getAllTasksByUserIdService(Number(userId));

    res.status(200).json({ status: 200, tasks });
  } catch (error) {
    res.status(500).json({ status: 500, error });
  }
};

const getTaskByUserIdTaskId = async (req: Request, res: Response) => {
  const { userId, taskId } = req.params;
  try {
    const userExists = await checkUserExists(Number(userId), res);
    if (!userExists) return;

    const task = await getTaskByUserIdTaskIdService(Number(userId), Number(taskId));

    res.status(200).json({ status: 200, task });
  } catch (error) {
    res.status(500).json({ status: 500, error });
  }
};

const replaceTaskByUserIdTaskId = async (req: Request, res: Response) => {
  const { userId, taskId } = req.params;
  const { title, description, status, priority } = req.body;
  try {
    const userExists = await checkUserExists(Number(userId), res);
    if (!userExists) return;

    const taskExists = await checkTaskExists(Number(taskId), res);
    if (!taskExists) return;

    const isAuthorizated = checkAuthorization(
      taskExists.userId === Number(userId),
      res
    );
    if (!isAuthorizated) return;

    const replacedTask = await replaceTaskByUserIdTaskIdService(
      Number(userId),
      Number(taskId),
      {
        title,
        description,
        status,
        priority,
      }
    );

    res.status(200).json({ status: 200, replacedTask });
  } catch (error) {
    res.status(500).json({ status: 500, error });
  }
};

const updateTaskByUserIdTaskId = async (req: Request, res: Response) => {
  const { userId, taskId } = req.params;
  const { title, description, status, priority } = req.body;
  try {
    const userExists = await checkUserExists(Number(userId), res);
    if (!userExists) return;

    const taskExists = await checkTaskExists(Number(taskId), res);
    if (!taskExists) return;

    const isAuthorizated = checkAuthorization(
      taskExists.userId === Number(userId),
      res
    );
    if (!isAuthorizated) return;

    const updatedTask = await updateTaskByUserIdTaskIdService(
      Number(userId),
      Number(taskId),
      {
        title,
        description,
        status,
        priority,
      }
    );

    res.status(200).json({ status: 200, updatedTask });
  } catch (error) {
    res.status(500).json({ status: 500, error });
  }
};

const deleteTaskByTaskId = async (req: Request, res: Response) => {
  const { userId, taskId } = req.params;
  try {
    const userExists = await checkUserExists(Number(userId), res);
    if (!userExists) return;

    const taskExists = await checkTaskExists(Number(taskId), res);
    if (!taskExists) return;

    const isAuthorizated = checkAuthorization(
      taskExists.userId === Number(userId),
      res
    );
    if (!isAuthorizated) return;

    await deleteTaskByTaskIdService(Number(taskId));

    res.status(200).json({ status: 200, message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ status: 500, error });
  }
};

export {
  createTask,
  getAllTasksByUserId,
  getTaskByUserIdTaskId,
  replaceTaskByUserIdTaskId,
  updateTaskByUserIdTaskId,
  deleteTaskByTaskId,
};
