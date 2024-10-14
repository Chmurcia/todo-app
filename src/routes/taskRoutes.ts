import { Router } from "express";
import {
  createTask,
  getAllTasksById,
  getTaskByIds,
} from "../controllers/taskController";

const router = Router();

router.route("/api/v1/user/:userId/task").get(getAllTasksById).post(createTask);
router.route("/api/v1/user/:userId/task/:taskId").get(getTaskByIds);

export { router as taskRouter };
