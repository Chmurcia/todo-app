import { Request, Response } from "express";
import {
  checkCategoryExists,
  checkTaskExists,
  checkUserExists,
} from "../utils/helpers";
import {
  createCategoryService,
  createTaskCategoryService,
  deleteCategoryByCategoryIdService,
  getCategoriesByTaskIdService,
  getCategoriesService,
  getCategoryByCategoryIdService,
  updateCategoryByCategoryIdService,
} from "../services/categoryService";
import { prisma } from "../utils/prisma";

const createCategory = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { categoryName } = req.body;
  try {
    const userExists = await checkUserExists(Number(userId), res);
    if (!userExists) return;

    const category = await createCategoryService(Number(userId), categoryName);

    res.status(200).json({ status: 200, category });
  } catch (error) {
    res.status(500).json({ status: 500, error });
  }
};

const createTaskCategory = async (req: Request, res: Response) => {
  const { taskId, categoryId } = req.params;
  try {
    const categoryExists = await checkCategoryExists(Number(categoryId), res);
    if (!categoryExists) return;

    const taskExists = await checkTaskExists(Number(taskId), res);
    if (!taskExists) return;

    const taskCategoryExists = await prisma.taskCategory.findFirst({
      where: {
        AND: [{ taskId: Number(taskId) }, { categoryId: Number(categoryId) }],
      },
    });
    if (taskCategoryExists) {
      res.status(409).json({
        status: 409,
        message: "Category is already assigned",
      });
      return;
    }

    const taskCategory = await createTaskCategoryService(
      Number(taskId),
      Number(categoryId)
    );

    res.status(200).json({ status: 200, taskCategory });
  } catch (error) {
    res.status(500).json({ status: 500, error });
  }
};

const getCategoryByCategoryId = async (req: Request, res: Response) => {
  const { categoryId } = req.params;
  try {
    const categoryExists = await checkCategoryExists(Number(categoryId), res);
    if (!categoryExists) return;

    const category = await getCategoryByCategoryIdService(Number(categoryId));

    res.status(200).json({ status: 200, category });
  } catch (error) {
    res.status(500).json({ status: 500, error });
  }
};

const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await getCategoriesService();

    res.status(200).json({ status: 200, categories });
  } catch (error) {
    res.status(500).json({ status: 500, error });
  }
};

const getCategoriesByTaskId = async (req: Request, res: Response) => {
  const { taskId } = req.params;
  try {
    const taskExists = await checkTaskExists(Number(taskId), res);
    if (!taskExists) return;

    const categories = await getCategoriesByTaskIdService(Number(taskId));

    res.status(200).json({ status: 200, categories });
  } catch (error) {
    res.status(500).json({ status: 500, error });
  }
};

const updateCategoryByCategoryId = async (req: Request, res: Response) => {
  const { categoryId } = req.params;
  const { categoryName } = req.body;
  try {
    const categoryExists = await checkCategoryExists(Number(categoryId), res);
    if (!categoryExists) return;

    const updatedCategory = await updateCategoryByCategoryIdService(
      Number(categoryId),
      categoryName
    );

    res.status(200).json({ status: 200, updatedCategory });
  } catch (error) {
    res.status(500).json({ status: 500, error });
  }
};

const deleteCategoryByCategoryId = async (req: Request, res: Response) => {
  const { categoryId } = req.params;
  try {
    const categoryExists = await checkCategoryExists(Number(categoryId), res);
    if (!categoryExists) return;

    await deleteCategoryByCategoryIdService(Number(categoryId));

    res
      .status(200)
      .json({ status: 200, message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ status: 500, error });
  }
};

export {
  createCategory,
  createTaskCategory,
  getCategoryByCategoryId,
  getCategories,
  getCategoriesByTaskId,
  updateCategoryByCategoryId,
  deleteCategoryByCategoryId,
};
