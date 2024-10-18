import { Router } from "express";
import {
  createSubtask,
  deleteSubtask,
  getSubtask,
  getSubtasks,
  replaceSubtask,
  updateSubtask,
} from "../controllers/subtaskController";

const router = Router();

router
  .route("/api/v1/user/:userId/task/:taskId/subtask")
  .get(getSubtasks)
  .post(createSubtask);

router
  .route("/api/v1/user/:userId/task/:taskId/subtask/:subtaskId")
  .get(getSubtask)
  .put(replaceSubtask)
  .patch(updateSubtask)
  .delete(deleteSubtask);

export { router as subtaskRouter };
