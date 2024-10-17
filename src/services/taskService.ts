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

const getAllTasksService = async (userId: number) => {
  const tasks = await prisma.task.findMany({
    where: {
      userId: Number(userId),
    },
  });

  return tasks;
};

const getTaskService = async (userId: number, taskId: number) => {
  const tasks = await prisma.task.findFirst({
    where: {
      AND: [{ id: Number(taskId) }, { userId: Number(userId) }],
    },
  });

  return tasks;
};

const replaceTaskService = async (
  userId: number,
  taskId: number,
  task: Task
) => {
  const replacedTask = await prisma.task.update({
    where: {
      id: Number(taskId),
    },
    data: {
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      updatedBy: Number(userId),
    },
  });

  return replacedTask;
};

const updateTaskService = async (
  userId: number,
  taskId: number,
  task: Task
) => {
  const updatedTask = await prisma.task.update({
    where: {
      id: Number(taskId),
    },
    data: {
      ...(task.title !== undefined && { title: task.title }),
      ...(task.description !== undefined && { description: task.description }),
      ...(task.status !== undefined && { status: task.status }),
      ...(task.priority !== undefined && { priority: task.priority }),
      updatedBy: Number(userId),
    },
  });
  return updatedTask;
};

const deleteTaskService = async (taskId: number) => {
  await prisma.task.delete({
    where: {
      id: Number(taskId),
    },
  });
};

export {
  createTaskService,
  getAllTasksService,
  getTaskService,
  replaceTaskService,
  updateTaskService,
  deleteTaskService,
};
