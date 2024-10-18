import { prisma } from "../utils/prisma";
import { Task } from "../utils/types";

const createSubtaskService = async (taskId: number, subtask: Task) => {
  const createdSubtask = await prisma.subtask.create({
    data: {
      title: subtask.title,
      description: subtask.description,
      status: subtask.status,
      priority: subtask.priority,
      taskId: Number(taskId),
      updatedBy: undefined,
    },
  });

  return createdSubtask;
};

const getSubtasksService = async (taskId: number) => {
  const subtasks = await prisma.subtask.findMany({
    where: {
      taskId: Number(taskId),
    },
  });

  return subtasks;
};

const getSubtaskService = async (subtaskId: number) => {
  const subtask = await prisma.subtask.findUnique({
    where: {
      id: Number(subtaskId),
    },
  });

  return subtask;
};

const replaceSubtaskService = async (
  userId: number,
  subtaskId: number,
  subtask: Task
) => {
  const replacedSubtask = await prisma.subtask.update({
    where: {
      id: Number(subtaskId),
    },
    data: {
      title: subtask.title,
      description: subtask.description,
      status: subtask.status,
      priority: subtask.priority,
      updatedBy: Number(userId),
    },
  });

  return replacedSubtask;
};

const updateSubtaskService = async (
  userId: number,
  subtaskId: number,
  subtask: Task
) => {
  const updatedSubtask = await prisma.subtask.update({
    where: {
      id: Number(subtaskId),
    },
    data: {
      ...(subtask.title !== undefined && { title: subtask.title }),
      ...(subtask.description !== undefined && {
        description: subtask.description,
      }),
      ...(subtask.status !== undefined && { status: subtask.status }),
      ...(subtask.priority !== undefined && { priority: subtask.priority }),
      updatedBy: Number(userId),
    },
  });

  return updatedSubtask;
};

const deleteSubtaskService = async (subtaskId: number) => {
  await prisma.subtask.delete({
    where: {
      id: Number(subtaskId),
    },
  });
};

export {
  createSubtaskService,
  getSubtasksService,
  getSubtaskService,
  replaceSubtaskService,
  updateSubtaskService,
  deleteSubtaskService,
};
