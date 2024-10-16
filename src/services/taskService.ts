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

const replaceTaskByIdService = async (taskId: number, task: Task) => {
  const replacedTask = await prisma.task.update({
    where: {
      id: Number(taskId),
    },
    data: {
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
    },
  });

  return replacedTask;
};

const updateTaskByIdService = async (taskId: number, task: Task) => {
  const updatedTask = await prisma.task.update({
    where: {
      id: Number(taskId),
    },
    data: {
      ...(task.title !== undefined && { title: task.title }),
      ...(task.description !== undefined && { description: task.description }),
      ...(task.status !== undefined && { status: task.status }),
      ...(task.priority !== undefined && { priority: task.priority }),
    },
  });
  return updatedTask;
};

const deleteTaskByIdService = async (taskId: number) => {
  await prisma.task.delete({
    where: {
      id: Number(taskId),
    },
  });
};

export {
  createTaskService,
  getAllTasksByIdService,
  getTaskByIdsService,
  replaceTaskByIdService,
  updateTaskByIdService,
  deleteTaskByIdService,
};
