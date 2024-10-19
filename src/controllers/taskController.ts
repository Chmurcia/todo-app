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
  isValidPriority,
  isValidStatus,
} from "../utils/helpers";
import { TaskFilters, TaskSort } from "../utils/types";

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

    if (!isValidStatus(status)) {
      res.status(400).json({ status: 400, message: "Invalid status value" });
      return;
    }

    if (!isValidPriority(priority)) {
      res.status(400).json({ status: 400, message: "Invalid priority value" });
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
  const filterBy = req.query.filterBy as string;
  const sort = req.query.sort as string;
  const { categoryId, page = 1, limit = 10 } = req.query;

  let filters: TaskFilters = {};
  let sortBy: TaskSort = {};

  if (filterBy) {
    const parsedFilters = JSON.parse(filterBy);
    filters = {
      status: parsedFilters.status || undefined,
      priority: parsedFilters.priority || undefined,
    };
  }

  if (categoryId) {
    filters.categoryId = Number(categoryId);
  }

  if (sort) {
    const parsedSort = JSON.parse(sort);
    sortBy = Object.keys(parsedSort).reduce((acc, key) => {
      acc[key] = parsedSort[key] === "asc" ? "asc" : "desc";
      return acc;
    }, {} as TaskSort);
  }

  const pageNum = Number(page);
  const limitNum = Number(limit);
  const skip = (pageNum - 1) * limitNum;

  try {
    const userExists = await checkUserExists(Number(userId), res);
    if (!userExists) return;

    const tasks = await getAllTasksService(
      Number(userId),
      filters,
      sortBy,
      skip,
      limitNum
    );

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

    if (!isValidStatus(status)) {
      res.status(400).json({ status: 400, message: "Invalid status value" });
      return;
    }

    if (!isValidPriority(priority)) {
      res.status(400).json({ status: 400, message: "Invalid priority value" });
      return;
    }

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

    if (!isValidStatus(status) && status !== undefined) {
      res.status(400).json({ status: 400, message: "Invalid status value" });
      return;
    }

    if (!isValidPriority(priority) && priority !== undefined) {
      res.status(400).json({ status: 400, message: "Invalid priority value" });
      return;
    }

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
