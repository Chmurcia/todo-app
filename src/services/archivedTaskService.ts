import { prisma } from "../utils/prisma";
import { ArchivedTask } from "../utils/types";

const createArchivedTaskService = async (
  userId: number,
  archiveTask: ArchivedTask
) => {
  const archivedTask = await prisma.archivedTask.create({
    data: {
      userId: Number(userId),
      title: archiveTask.title,
      description: archiveTask.description,
    },
  });

  return archivedTask;
};

const getArchivedTasksService = async (userId: number) => {
  const archivedTasks = await prisma.archivedTask.findMany({
    where: {
      userId: Number(userId),
    },
  });

  return archivedTasks;
};

const deleteArchivedTaskService = async (taskId: number) => {
  await prisma.archivedTask.delete({
    where: {
      id: Number(taskId),
    },
  });
};

export {
  createArchivedTaskService,
  getArchivedTasksService,
  deleteArchivedTaskService,
};
