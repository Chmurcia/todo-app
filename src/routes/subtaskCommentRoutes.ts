import { Router } from "express";
import {
  createSubtaskComment,
  getSubtaskComments,
  getSubtaskComment,
  updateSubtaskComment,
  deleteSubtaskComment,
} from "../controllers/subtaskCommentController";

const router = Router();

router
  .route("/api/v1/user/:userId/task/:taskId/subtask/:subtaskId/comment")
  .get(getSubtaskComments)
  .post(createSubtaskComment);
router
  .route(
    "/api/v1/user/:userId/task/:taskId/subtask/:subtaskId/comment/:commentId"
  )
  .get(getSubtaskComment)
  .patch(updateSubtaskComment)
  .delete(deleteSubtaskComment);

export { router as subtaskCommentRouter };
