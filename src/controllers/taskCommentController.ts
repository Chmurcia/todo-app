import { Request, Response } from "express";
import {
  checkCommentExists,
  checkTaskExists,
  checkUserExists,
} from "../utils/helpers";
import {
  createCommentService,
  deleteCommentService,
  getCommentService,
  getCommentsService,
  updateCommentService,
} from "../services/taskCommentService";

const createComment = async (req: Request, res: Response) => {
  const { userId, taskId } = req.params;
  const { content } = req.body;
  try {
    const userExists = await checkUserExists(Number(userId), res);
    if (!userExists) return;
    const taskExists = await checkTaskExists(Number(taskId), res);
    if (!taskExists) return;
    if (content.length < 1) {
      res
        .status(400)
        .json({ status: 400, message: "Content cannot be empty!" });
      return;
    }

    const createdComment = await createCommentService(
      Number(userId),
      Number(taskId),
      content
    );

    res
      .status(201)
      .location(
        `/api/v1/user/${userId}/task/${taskId}/comment/${createdComment.id}`
      )
      .json({ status: 201, createdComment });
  } catch (error) {
    res.status(500).json({ status: 500, error });
  }
};

const getComments = async (req: Request, res: Response) => {
  const { taskId } = req.params;
  try {
    const taskExists = await checkTaskExists(Number(taskId), res);
    if (!taskExists) return;

    const comments = await getCommentsService(Number(taskId));

    res.status(200).json({ status: 200, comments });
  } catch (error) {
    res.status(500).json({
      status: 500,
      error,
    });
  }
};

const getComment = async (req: Request, res: Response) => {
  const { commentId } = req.params;
  try {
    const commentExists = await checkCommentExists(Number(commentId), res);
    if (!commentExists) return;

    const comment = await getCommentService(Number(commentId));

    res.status(200).json({ status: 200, comment });
  } catch (error) {
    res.status(500).json({ status: 500, error });
  }
};

const updateComment = async (req: Request, res: Response) => {
  const { commentId } = req.params;
  const { content } = req.body;
  try {
    const commentExists = await checkCommentExists(Number(commentId), res);
    if (!commentExists) return;

    if (content.length < 1) {
      res
        .status(400)
        .json({ status: 400, message: "Content cannot be empty!" });
      return;
    }

    const updatedComment = await updateCommentService(
      Number(commentId),
      content
    );
    res.status(200).json({ status: 200, updatedComment });
  } catch (error) {
    res.status(500).json({ status: 500, error });
  }
};

const deleteComment = async (req: Request, res: Response) => {
  const { commentId } = req.params;
  try {
    const commentExists = await checkCommentExists(Number(commentId), res);
    if (!commentExists) return;

    await deleteCommentService(Number(commentId));

    res
      .status(200)
      .json({ status: 200, message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ status: 500, error });
  }
};

export { createComment, getComments, getComment, updateComment, deleteComment };
