import { prisma } from "../utils/prisma";

const createSubtaskCommentService = async (
  userId: number,
  subtaskId: number,
  content: string
) => {
  const createdSubtaskComment = await prisma.subtaskComment.create({
    data: {
      content,
      userId: Number(userId),
      subtaskId: Number(subtaskId),
    },
  });

  return createdSubtaskComment;
};

const getSubtaskCommentsService = async (subtaskId: number) => {
  const subtaskComments = await prisma.subtaskComment.findMany({
    where: {
      subtaskId: Number(subtaskId),
    },
  });

  return subtaskComments;
};

const getSubtaskCommentService = async (commentId: number) => {
  const subtaskComment = await prisma.subtaskComment.findUnique({
    where: {
      id: Number(commentId),
    },
  });

  return subtaskComment;
};

const updateSubtaskCommentService = async (
  commentId: number,
  content: string
) => {
  const updatedSubtaskComment = await prisma.subtaskComment.update({
    where: {
      id: Number(commentId),
    },
    data: {
      content,
    },
  });

  return updatedSubtaskComment;
};

const deleteSubtaskCommentService = async (commentId: number) => {
  await prisma.subtaskComment.delete({
    where: {
      id: Number(commentId),
    },
  });
  return deleteSubtaskCommentService;
};

export {
  createSubtaskCommentService,
  getSubtaskCommentsService,
  getSubtaskCommentService,
  updateSubtaskCommentService,
  deleteSubtaskCommentService,
};
