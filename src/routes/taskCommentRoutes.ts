import { Router } from "express";
import {
  createComment,
  deleteComment,
  getComment,
  getComments,
  updateComment,
} from "../controllers/taskCommentController";
const router = Router();

router
  .route("/api/v1/user/:userId/task/:taskId/comment")
  .get(getComments)
  .post(createComment);

router
  .route("/api/v1/user/:userId/task/comment/:commentId")
  .get(getComment)
  .patch(updateComment)
  .delete(deleteComment);

export { router as commentRouter };
