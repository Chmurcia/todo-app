import { Request, Response } from "express";

import {
  createSubtaskCommentService,
  getSubtaskCommentsService,
  getSubtaskCommentService,
  updateSubtaskCommentService,
  deleteSubtaskCommentService,
} from "../services/subtaskCommentService";
import {
  checkSubtaskCommentExists,
  checkSubtaskExists,
  checkUserExists,
} from "../utils/helpers";

const createSubtaskComment = async (req: Request, res: Response) => {
  const { userId, subtaskId } = req.params;
  const { content } = req.body;
  try {
    const userExists = await checkUserExists(Number(userId), res);
    if (!userExists) return;
    const subtaskExists = await checkSubtaskExists(Number(subtaskId), res);
    if (!subtaskExists) return;
    if (content.length < 1) {
      res
        .status(400)
        .json({ status: 400, message: "Content cannot be empty!" });
      return;
    }

    const createdSubtaskComment = await createSubtaskCommentService(
      Number(userId),
      Number(subtaskId),
      content
    );

    res
      .status(201)
      .location(
        `/api/v1/user/${userId}/task/:taskId/subtask/${subtaskId}/comment/${createdSubtaskComment.id}`
      )
      .json({ status: 201, createdSubtaskComment });
  } catch (error) {
    res.status(500).json({ status: 500, error });
  }
};

const getSubtaskComments = async (req: Request, res: Response) => {
  const { subtaskId } = req.params;
  try {
    const subtaskExists = await checkSubtaskExists(Number(subtaskId), res);
    if (!subtaskExists) return;

    const subtaskComments = await getSubtaskCommentsService(Number(subtaskId));

    res.status(200).json({ status: 200, subtaskComments });
  } catch (error) {
    res.status(500).json({ status: 500, error });
  }
};

const getSubtaskComment = async (req: Request, res: Response) => {
  const { commentId } = req.params;
  try {
    const commentExists = await checkSubtaskCommentExists(
      Number(commentId),
      res
    );
    if (!commentExists) return;

    const subtaskComment = await getSubtaskCommentService(Number(commentId));

    res.status(200).json({ status: 200, subtaskComment });
  } catch (error) {
    res.status(500).json({ status: 500, error });
  }
};

const updateSubtaskComment = async (req: Request, res: Response) => {
  const { commentId } = req.params;
  const { content } = req.body;
  try {
    const commentExists = await checkSubtaskCommentExists(
      Number(commentId),
      res
    );
    if (!commentExists) return;
    if (content.length < 1) {
      res
        .status(400)
        .json({ status: 400, message: "Content cannot be empty!" });
      return;
    }

    const updatedSubtaskComment = await updateSubtaskCommentService(
      Number(commentId),
      content
    );

    res.status(200).json({ status: 200, updatedSubtaskComment });
  } catch (error) {
    res.status(500).json({ status: 500, error });
  }
};

const deleteSubtaskComment = async (req: Request, res: Response) => {
  const { commentId } = req.params;
  try {
    const commentExists = await checkSubtaskCommentExists(
      Number(commentId),
      res
    );
    if (!commentExists) return;

    await deleteSubtaskCommentService(Number(commentId));
    res
      .status(200)
      .json({ status: 200, message: "Subtask comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ status: 500, error });
  }
};

export {
  createSubtaskComment,
  getSubtaskComments,
  getSubtaskComment,
  updateSubtaskComment,
  deleteSubtaskComment,
};
