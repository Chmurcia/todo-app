import { prisma } from "../utils/prisma";
import { Task } from "../utils/types";

const createTaskService = async (userId: number, task: Task) => {
  const createdTask = await prisma.task.create({
    data: {
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      userId: Number(userId),
      updatedBy: undefined,
    },
  });

  return createdTask;
};

const getAllTasksByIdService = async (userId: number) => {
  const tasks = await prisma.task.findMany({
    where: {
      userId: Number(userId),
    },
  });

  return tasks;
};

const getTaskByIdsService = async (userId: number, taskId: number) => {
  const tasks = await prisma.task.findFirst({
    where: {
      AND: [{ id: Number(taskId) }, { userId: Number(userId) }],
    },
  });

  return tasks;
};

export { createTaskService, getAllTasksByIdService, getTaskByIdsService };
