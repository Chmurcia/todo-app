import { Router } from "express";
import {
  createCategory,
  createTaskCategory,
  deleteCategory,
  getCategoriesByUser,
  getCategories,
  getCategory,
  updateCategory,
} from "../controllers/categoryController";

const router = Router();

router
  .route("/api/v1/user/:userId/task/category")
  .get(getCategoriesByUser)
  .post(createCategory);
router
  .route("/api/v1/user/:userId/task/category/:categoryId")
  .get(getCategory)
  .patch(updateCategory)
  .delete(deleteCategory);
router.route("/api/v1/user/:userId/task/:taskId/category").get(getCategories);
router
  .route("/api/v1/user/:userId/task/:taskId/category/:categoryId")
  .post(createTaskCategory);

export { router as categoryRouter };
