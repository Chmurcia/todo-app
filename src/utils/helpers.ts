import { Response } from "express";
import { prisma } from "./prisma";

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

export const checkAuthorization = (condition: boolean, res: Response) => {
  if (!condition) {
    res.status(403).json({ status: 403, message: "Authorization failed" });
    return false;
  }

  return true;
};
