import { Router } from "express";
import {
  createArchivedTask,
  deleteArchivedTask,
  getArchivedTasks,
} from "../controllers/archivedTaskController";
const router = Router();

router.route("/api/v1/user/:userId/task/archive").post(createArchivedTask);
router
  .route("/api/v1/user/:userId/task/archive/:archiveId")
  .get(getArchivedTasks)
  .delete(deleteArchivedTask);

export { router as archivedRouter };
