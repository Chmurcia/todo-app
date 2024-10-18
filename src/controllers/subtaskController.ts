import { Request, Response } from "express";
import {
  checkSubtaskExists,
  checkTaskExists,
  checkUserExists,
  isValidPriority,
  isValidStatus,
} from "../utils/helpers";
import {
  createSubtaskService,
  deleteSubtaskService,
  getSubtaskService,
  getSubtasksService,
  replaceSubtaskService,
  updateSubtaskService,
} from "../services/subtaskService";

const createSubtask = async (req: Request, res: Response) => {
  const { taskId } = req.params;
  const { title, description, status, priority } = req.body;
  try {
    const taskExists = await checkTaskExists(Number(taskId), res);
    if (!taskExists) return;
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

    const subtask = { title, description, status, priority };

    const createdSubtask = await createSubtaskService(Number(taskId), subtask);

    res.status(200).json({ status: 200, createdSubtask });
  } catch (error) {
    res.status(500).json({ status: 500, error });
  }
};

const getSubtasks = async (req: Request, res: Response) => {
  const { taskId } = req.params;
  try {
    const taskExists = await checkTaskExists(Number(taskId), res);
    if (!taskExists) return;

    const subtasks = await getSubtasksService(Number(taskId));

    res.status(200).json({ status: 200, subtasks });
  } catch (error) {
    res.status(500).json({ status: 500, error });
  }
};

const getSubtask = async (req: Request, res: Response) => {
  const { subtaskId } = req.params;
  try {
    const subtasksExists = await checkSubtaskExists(Number(subtaskId), res);
    if (!subtasksExists) return;

    const subtask = await getSubtaskService(Number(subtaskId));

    res.status(200).json({ status: 200, subtask });
  } catch (error) {
    res.status(500).json({ status: 500, error });
  }
};

const replaceSubtask = async (req: Request, res: Response) => {
  const { userId, subtaskId } = req.params;
  const { title, description, status, priority } = req.body;
  try {
    const userExists = await checkUserExists(Number(userId), res);
    if (!userExists) return;

    const subtasksExists = await checkSubtaskExists(Number(subtaskId), res);
    if (!subtasksExists) return;
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

    const subtask = { title, description, status, priority };

    const replacedSubtask = await replaceSubtaskService(
      Number(userId),
      Number(subtaskId),
      subtask
    );

    res.status(200).json({ status: 200, replacedSubtask });
  } catch (error) {
    res.status(500).json({ status: 500, error });
  }
};

const updateSubtask = async (req: Request, res: Response) => {
  const { userId, subtaskId } = req.params;
  const { title, description, status, priority } = req.body;
  try {
    const userExists = await checkUserExists(Number(userId), res);
    if (!userExists) return;

    const subtasksExists = await checkSubtaskExists(Number(subtaskId), res);
    if (!subtasksExists) return;

    if (!isValidStatus(status) && status !== undefined) {
      res.status(400).json({ status: 400, message: "Invalid status value" });
      return;
    }

    if (!isValidPriority(priority) && priority !== undefined) {
      res.status(400).json({ status: 400, message: "Invalid priority value" });
      return;
    }

    const subtask = { title, description, status, priority };

    const updatedSubtask = await updateSubtaskService(
      Number(userId),
      Number(subtaskId),
      subtask
    );

    res.status(200).json({ status: 200, updatedSubtask });
  } catch (error) {
    res.status(500).json({ status: 500, error });
  }
};

const deleteSubtask = async (req: Request, res: Response) => {
  const { subtaskId } = req.params;
  try {
    const subtasksExists = await checkSubtaskExists(Number(subtaskId), res);
    if (!subtasksExists) return;

    await deleteSubtaskService(Number(subtaskId));

    res
      .status(200)
      .json({ status: 200, message: "Subtask deleted successfully" });
  } catch (error) {
    res.status(500).json({ status: 500, error });
  }
};

export {
  createSubtask,
  getSubtasks,
  getSubtask,
  replaceSubtask,
  updateSubtask,
  deleteSubtask,
};
