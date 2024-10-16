import { Router } from "express";
import {
  createTask,
  getAllTasksByUserId,
  getTaskByUserIdTaskId,
  replaceTaskByUserIdTaskId,
  updateTaskByUserIdTaskId,
  deleteTaskByTaskId,
} from "../controllers/taskController";

const router = Router();

router
  .route("/api/v1/user/:userId/task")
  .get(getAllTasksByUserId)
  .post(createTask);
router
  .route("/api/v1/user/:userId/task/:taskId")
  .get(getTaskByUserIdTaskId)
  .put(replaceTaskByUserIdTaskId)
  .patch(updateTaskByUserIdTaskId)
  .delete(deleteTaskByTaskId);

export { router as taskRouter };
