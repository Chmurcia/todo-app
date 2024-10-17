import { Request, Response } from "express";
import {
  createTaskService,
  getAllTasksService,
  getTaskService,
  replaceTaskService,
  updateTaskService,
  deleteTaskService,
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

const getAllTasks = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const userExists = await checkUserExists(Number(userId), res);
    if (!userExists) return;

    const tasks = await getAllTasksService(Number(userId));

    res.status(200).json({ status: 200, tasks });
  } catch (error) {
    res.status(500).json({ status: 500, error });
  }
};

const getTask = async (req: Request, res: Response) => {
  const { userId, taskId } = req.params;
  try {
    const userExists = await checkUserExists(Number(userId), res);
    if (!userExists) return;

    const task = await getTaskService(Number(userId), Number(taskId));

    res.status(200).json({ status: 200, task });
  } catch (error) {
    res.status(500).json({ status: 500, error });
  }
};

const replaceTask = async (req: Request, res: Response) => {
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

    const replacedTask = await replaceTaskService(
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

const updateTask = async (req: Request, res: Response) => {
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

    const updatedTask = await updateTaskService(
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

const deleteTask = async (req: Request, res: Response) => {
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

    await deleteTaskService(Number(taskId));

    res.status(200).json({ status: 200, message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ status: 500, error });
  }
};

export {
  createTask,
  getAllTasks,
  getTask,
  replaceTask,
  updateTask,
  deleteTask,
};
