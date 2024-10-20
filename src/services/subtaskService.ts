import { prisma } from "../utils/prisma";
import { SubtaskFilters, Task, TaskSort } from "../utils/types";

const createSubtaskService = async (taskId: number, subtask: Task) => {
  const createdSubtask = await prisma.subtask.create({
    data: {
      title: subtask.title,
      description: subtask.description,
      status: subtask.status,
      priority: subtask.priority,
      duedate: subtask.dueDate,
      taskId: Number(taskId),
      updatedBy: undefined,
    },
  });

  return createdSubtask;
};

const getAllSubtasksService = async (
  taskId: number,
  filters: SubtaskFilters,
  sortBy: TaskSort,
  skip: number,
  limit: number
) => {
  const orderBy = sortBy ? sortBy : undefined;
  const subtasks = await prisma.subtask.findMany({
    where: {
      taskId: Number(taskId),
      ...(filters.status !== undefined && { status: filters.status }),
      ...(filters.priority !== undefined && { priority: filters.priority }),
    },
    orderBy,
    skip,
    take: limit,
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
      duedate: subtask.dueDate,
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
      ...(subtask.dueDate !== undefined && { duedate: subtask.dueDate }),
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
  getAllSubtasksService,
  getSubtaskService,
  replaceSubtaskService,
  updateSubtaskService,
  deleteSubtaskService,
};
