import { Router } from "express";
import {
  createCategory,
  createTaskCategory,
  deleteCategoryByCategoryId,
  getCategories,
  getCategoriesByTaskId,
  getCategoryByCategoryId,
  updateCategoryByCategoryId,
} from "../controllers/categoryController";

const router = Router();

router
  .route("/api/v1/user/:userId/task/category")
  .get(getCategories)
  .post(createCategory);
router
  .route("/api/v1/user/:userId/task/category/:categoryId")
  .get(getCategoryByCategoryId)
  .patch(updateCategoryByCategoryId)
  .delete(deleteCategoryByCategoryId);
router
  .route("/api/v1/user/:userId/task/:taskId/category")
  .get(getCategoriesByTaskId);
router
  .route("/api/v1/user/:userId/task/:taskId/category/:categoryId")
  .post(createTaskCategory);

export { router as categoryRouter };
