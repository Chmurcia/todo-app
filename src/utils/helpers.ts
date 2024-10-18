import { Response } from "express";
import { prisma } from "./prisma";
import { Status, Priority } from "./types";

export const checkUserExists = async (userId: number, res: Response) => {
  const userExists = await prisma.user.findUnique({
    where: { id: Number(userId) },
  });
  if (!userExists) {
    res.status(404).json({
      status: 404,
      message: "User not found",
    });
    return null;
  }
  return userExists;
};

export const checkTaskExists = async (taskId: number, res: Response) => {
  const taskExists = await prisma.task.findUnique({
    where: {
      id: Number(taskId),
    },
  });
  if (!taskExists) {
    res.status(404).json({ status: 404, message: "Task not found" });
    return null;
  }
  return taskExists;
};

export const checkSubtaskExists = async (subtaskId: number, res: Response) => {
  const subtaskExists = await prisma.subtask.findUnique({
    where: {
      id: Number(subtaskId),
    },
  });
  if (!subtaskExists) {
    res.status(404).json({ status: 404, message: "Subtask not found" });
    return null;
  }
  return subtaskExists;
};

export const checkArchivedTaskExists = async (
  archivedTaskId: number,
  res: Response
) => {
  const archivedTaskExists = await prisma.archivedTask.findUnique({
    where: {
      id: Number(archivedTaskId),
    },
  });
  if (!archivedTaskExists) {
    res.status(404).json({ status: 404, message: "Archived task not found" });
    return null;
  }
  return archivedTaskExists;
};

export const checkCategoryExists = async (
  categoryId: number,
  res: Response
) => {
  const categoryExists = await prisma.category.findUnique({
    where: {
      id: Number(categoryId),
    },
  });
  if (!categoryExists) {
    res.status(404).json({ status: 404, message: "Category not found" });
    return null;
  }
  return categoryExists;
};

export const checkCommentExists = async (commentId: number, res: Response) => {
  const commentExists = await prisma.comment.findUnique({
    where: {
      id: Number(commentId),
    },
  });
  if (!commentExists) {
    res.status(404).json({ status: 404, message: "Comment not found" });
    return null;
  }
  return commentExists;
};

export const checkAuthorization = (condition: boolean, res: Response) => {
  if (!condition) {
    res.status(403).json({ status: 403, message: "Authorization failed" });
    return false;
  }

  return true;
};

export const isValidStatus = (status: string): status is Status => {
  return Object.values(Status).includes(status as Status);
};

export const isValidPriority = (priority: string): priority is Priority => {
  return Object.values(Priority).includes(priority as Priority);
};
