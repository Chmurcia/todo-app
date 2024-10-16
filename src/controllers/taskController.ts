import { Request, Response } from "express";
import {
  createTaskService,
  deleteTaskByIdService,
  getAllTasksByIdService,
  getTaskByIdsService,
  replaceTaskByIdService,
  updateTaskByIdService,
} from "../services/taskService";
import { prisma } from "../utils/prisma";
import { checkAuthorization, checkUserExists } from "../utils/helpers";

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

const replaceTaskById = async (req: Request, res: Response) => {
  const { userId, taskId } = req.params;
  const { title, description, status, priority } = req.body;
  try {
    const userExists = await checkUserExists(Number(userId), res);
    if (!userExists) return;

    const taskExists = await prisma.task.findUnique({
      where: {
        id: Number(taskId),
      },
    });
    if (!taskExists) {
      res.status(404).json({ status: 404, message: "Task not found" });
      return;
    }

    const isAuthorizated = checkAuthorization(
      taskExists.userId === Number(userId),
      res
    );
    if (!isAuthorizated) return;

    const replacedTask = await replaceTaskByIdService(
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
  } catch (err) {
    res.status(500).json({ status: 500, error: err });
  }
};

const updateTaskById = async (req: Request, res: Response) => {
  const { userId, taskId } = req.params;
  const { title, description, status, priority } = req.body;
  try {
    const userExists = await checkUserExists(Number(userId), res);
    if (!userExists) return;

    const taskExists = await prisma.task.findUnique({
      where: {
        id: Number(taskId),
      },
    });
    if (!taskExists) {
      res.status(404).json({ status: 404, message: "Task not found" });
      return;
    }

    const isAuthorizated = checkAuthorization(
      taskExists.userId === Number(userId),
      res
    );
    if (!isAuthorizated) return;

    const updatedTask = await updateTaskByIdService(
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
  } catch (err) {
    res.status(500).json({ status: 500, error: err });
  }
};

const deleteTaskById = async (req: Request, res: Response) => {
  const { userId, taskId } = req.params;
  try {
    const userExists = await checkUserExists(Number(userId), res);
    if (!userExists) return;

    const taskExists = await prisma.task.findUnique({
      where: {
        id: Number(taskId),
      },
    });
    if (!taskExists) {
      res.status(404).json({ status: 404, message: "Task not found" });
      return;
    }

    const isAuthorizated = checkAuthorization(
      taskExists.userId === Number(userId),
      res
    );
    if (!isAuthorizated) return;

    await deleteTaskByIdService(Number(taskId));

    res.status(200).json({ status: 200, message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ status: 500, error: err });
  }
};

export {
  createTask,
  getAllTasksById,
  getTaskByIds,
  replaceTaskById,
  updateTaskById,
  deleteTaskById,
};
