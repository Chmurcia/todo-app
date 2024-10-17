import { prisma } from "../utils/prisma";

const createCategoryService = async (userId: number, categoryName: string) => {
  const category = await prisma.category.create({
    data: {
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
      categoryId: Number(categoryId),
      taskId: Number(taskId),
    },
  });

  return taskCategory;
};

const getCategoryByCategoryIdService = async (categoryId: number) => {
  const category = await prisma.category.findUnique({
    where: {
      id: Number(categoryId),
    },
  });
  return category;
};

const getCategoriesService = async () => {
  const categories = await prisma.category.findMany();
  return categories;
};

const getCategoriesByTaskIdService = async (taskId: number) => {
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

const updateCategoryByCategoryIdService = async (
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

const deleteCategoryByCategoryIdService = async (categoryId: number) => {
  await prisma.category.delete({
    where: {
      id: Number(categoryId),
    },
  });
};

export {
  createCategoryService,
  createTaskCategoryService,
  getCategoryByCategoryIdService,
  getCategoriesService,
  getCategoriesByTaskIdService,
  updateCategoryByCategoryIdService,
  deleteCategoryByCategoryIdService,
};
