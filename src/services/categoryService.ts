import { prisma } from "../utils/prisma";

const createCategoryService = async (userId: number, categoryName: string) => {
  const category = await prisma.category.create({
    data: {
      userId: Number(userId),
      categoryName,
    },
  });

  return category;
};

const createTaskCategoryService = async (
  taskId: number,
  categoryId: number
) => {
  const taskCategory = await prisma.taskCategory.create({
    data: {
      taskId: Number(taskId),
      categoryId: Number(categoryId),
    },
  });

  return taskCategory;
};

const getCategoryService = async (categoryId: number) => {
  const category = await prisma.category.findUnique({
    where: {
      id: Number(categoryId),
    },
  });
  return category;
};

const getCategoriesService = async (taskId: number) => {
  const categories = await prisma.category.findMany({
    where: {
      TaskCategory: {
        some: {
          taskId: Number(taskId),
        },
      },
    },
  });
  return categories;
};

const getCategoriesByUserService = async (userId: number) => {
  const categories = await prisma.category.findMany({
    where: {
      userId: Number(userId),
    },
  });
  return categories;
};

const updateCategoryService = async (
  categoryId: number,
  categoryName: string
) => {
  const updatedCategory = await prisma.category.update({
    where: {
      id: Number(categoryId),
    },
    data: {
      categoryName,
    },
  });

  return updatedCategory;
};

const deleteCategoryService = async (categoryId: number) => {
  await prisma.category.delete({
    where: {
      id: Number(categoryId),
    },
  });
};

export {
  createCategoryService,
  createTaskCategoryService,
  getCategoryService,
  getCategoriesService,
  getCategoriesByUserService,
  updateCategoryService,
  deleteCategoryService,
};
