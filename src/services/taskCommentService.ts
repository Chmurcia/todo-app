import { prisma } from "../utils/prisma";

const createCommentService = async (
  userId: number,
  taskId: number,
  content: string
) => {
  const comment = await prisma.comment.create({
    data: {
      content,
      userId: Number(userId),
      taskId: Number(taskId),
    },
  });

  return comment;
};

const getCommentsService = async (taskId: number) => {
  const comments = await prisma.comment.findMany({
    where: {
      taskId: Number(taskId),
    },
  });

  return comments;
};

const getCommentService = async (commentId: number) => {
  const comment = await prisma.comment.findUnique({
    where: {
      id: Number(commentId),
    },
  });

  return comment;
};

const updateCommentService = async (commentId: number, content: string) => {
  const updatedComment = await prisma.comment.update({
    where: {
      id: Number(commentId),
    },
    data: {
      content,
    },
  });

  return updatedComment;
};

const deleteCommentService = async (commentId: number) => {
  await prisma.comment.delete({
    where: {
      id: Number(commentId),
    },
  });
};

export {
  createCommentService,
  getCommentsService,
  getCommentService,
  updateCommentService,
  deleteCommentService,
};
