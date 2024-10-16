import { Router } from "express";
import {
  createTask,
  deleteTaskById,
  getAllTasksById,
  getTaskByIds,
  replaceTaskById,
  updateTaskById,
} from "../controllers/taskController";

const router = Router();

router.route("/api/v1/user/:userId/task").get(getAllTasksById).post(createTask);
router
  .route("/api/v1/user/:userId/task/:taskId")
  .get(getTaskByIds)
  .put(replaceTaskById)
  .patch(updateTaskById)
  .delete(deleteTaskById);

export { router as taskRouter };
