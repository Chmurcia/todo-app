import { Request, Response } from "express";
import { checkArchivedTaskExists, checkUserExists } from "../utils/helpers";
import {
  createArchivedTaskService,
  deleteArchivedTaskService,
  getArchivedTasksService,
} from "../services/archivedTaskService";

const createArchivedTask = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { title, description } = req.body;
  try {
    const userExists = await checkUserExists(Number(userId), res);
    if (!userExists) return;

    if (
      ![title, description].every(
        (value: any): value is string => typeof value === "string"
      )
    ) {
      res.status(400).json({ status: 400, message: "Invalid input types" });
      return;
    }

    const archivedTask = await createArchivedTaskService(Number(userId), {
      title,
      description,
    });

    res.status(200).json({ status: 200, archivedTask });
  } catch (error) {
    res.status(500).json({ status: 500, error });
  }
};

const getArchivedTasks = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const userExists = await checkUserExists(Number(userId), res);
    if (!userExists) return;

    const archivedTasks = await getArchivedTasksService(Number(userId));

    res.status(200).json({ status: 200, archivedTasks });
  } catch (error) {
    res.status(500).json({ status: 500, error });
  }
};

const deleteArchivedTask = async (req: Request, res: Response) => {
  const { archiveId } = req.params;
  try {
    const archivedTaskExists = await checkArchivedTaskExists(
      Number(archiveId),
      res
    );
    if (!archivedTaskExists) return;

    await deleteArchivedTaskService(Number(archiveId));

    res.status(200).json({ status: 200, message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ status: 500, error });
  }
};

export { createArchivedTask, getArchivedTasks, deleteArchivedTask };
