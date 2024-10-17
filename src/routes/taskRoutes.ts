import { Router } from "express";
import {
  createTask,
  getAllTasks,
  getTask,
  replaceTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController";

const router = Router();

router.route("/api/v1/user/:userId/task").get(getAllTasks).post(createTask);
router
  .route("/api/v1/user/:userId/task/:taskId")
  .get(getTask)
  .put(replaceTask)
  .patch(updateTask)
  .delete(deleteTask);

export { router as taskRouter };
