import { Request, Response } from "express";
import {
  checkCategoryExists,
  checkTaskExists,
  checkUserExists,
} from "../utils/helpers";
import {
  createCategoryService,
  createTaskCategoryService,
  deleteCategoryService,
  getCategoriesByUserService,
  getCategoriesService,
  getCategoryService,
  updateCategoryService,
} from "../services/categoryService";
import { prisma } from "../utils/prisma";

const createCategory = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { categoryName } = req.body;
  try {
    const userExists = await checkUserExists(Number(userId), res);
    if (!userExists) return;

    const createdCategory = await createCategoryService(
      Number(userId),
      categoryName
    );

    res
      .status(201)
      .location(`/api/v1/user/${userId}/task/category/${createdCategory.id}`)
      .json({ status: 201, createdCategory });
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

    res.status(201).json({ status: 201, taskCategory });
  } catch (error) {
    res.status(500).json({ status: 500, error });
  }
};

const getCategory = async (req: Request, res: Response) => {
  const { categoryId } = req.params;
  try {
    const categoryExists = await checkCategoryExists(Number(categoryId), res);
    if (!categoryExists) return;

    const category = await getCategoryService(Number(categoryId));

    res.status(200).json({ status: 200, category });
  } catch (error) {
    res.status(500).json({ status: 500, error });
  }
};

const getCategories = async (req: Request, res: Response) => {
  const { taskId } = req.params;
  try {
    const taskExists = await checkTaskExists(Number(taskId), res);
    if (!taskExists) return;

    const categories = await getCategoriesService(Number(taskId));

    res.status(200).json({ status: 200, categories });
  } catch (error) {
    res.status(500).json({ status: 500, error });
  }
};

const getCategoriesByUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const userExists = await checkUserExists(Number(userId), res);
    if (!userExists) return;

    const categories = await getCategoriesByUserService(Number(userId));

    res.status(200).json({ status: 200, categories });
  } catch (error) {
    res.status(500).json({ status: 500, error });
  }
};

const updateCategory = async (req: Request, res: Response) => {
  const { categoryId } = req.params;
  const { categoryName } = req.body;
  try {
    const categoryExists = await checkCategoryExists(Number(categoryId), res);
    if (!categoryExists) return;

    const updatedCategory = await updateCategoryService(
      Number(categoryId),
      categoryName
    );

    res.status(200).json({ status: 200, updatedCategory });
  } catch (error) {
    res.status(500).json({ status: 500, error });
  }
};

const deleteCategory = async (req: Request, res: Response) => {
  const { categoryId } = req.params;
  try {
    const categoryExists = await checkCategoryExists(Number(categoryId), res);
    if (!categoryExists) return;

    await deleteCategoryService(Number(categoryId));

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
  getCategory,
  getCategories,
  getCategoriesByUser,
  updateCategory,
  deleteCategory,
};
