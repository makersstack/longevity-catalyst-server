import { Request, Response } from "express";
import httpStatus from "http-status";
import { paginationFileds } from "../../../../constants/pagination";
import ApiError from "../../../../errors/ApiError";
import catchAsync from "../../../../shared/catchAsync";
import pick from "../../../../shared/pick";
import sendResponse from "../../../../shared/sendResponse";
import { replyService } from "./reply.services";

const createReply = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  const projectId = Number(req.params.projectId);
  const commentId = Number(req.params.commentId);
  const { replyText } = req.body;

  if (!token || !replyText || !projectId || !commentId) {
    throw new ApiError(httpStatus.NOT_ACCEPTABLE, "Something is missing");
  }

  const replyResult = await replyService.createReply(
    token,
    projectId,
    commentId,
    replyText
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Reply Created successfully!",
    data: replyResult,
  });
});

const updateReply = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  const replyId = Number(req.params.replyId);
  const { replyText } = req.body;

  if (!token) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized");
  }

  const updatedReply = await replyService.updateReply(
    token,
    replyId,
    replyText
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Reply Data Update successfully!",
    data: updatedReply,
  });
});

const deleteReply = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  const replyId = Number(req.params.replyId);

  if (!token || !replyId) {
    throw new ApiError(httpStatus.NOT_ACCEPTABLE, "Not found creadiential");
  }
  if (!token) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "You are unauthorized");
  }

  const deleteReplyResult = await replyService.deleteReply(token, replyId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Reply Successfully Deleted",
    data: deleteReplyResult,
  });
});

const getAllReplysByComment = catchAsync(
  async (req: Request, res: Response) => {
    const paginationOptions = pick(req.query, paginationFileds);
    const commentId = Number(req.params.commentId);

    const replys = await replyService.getAllReplyByComment(
      commentId,
      paginationOptions
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Replies Rettrif successfylly",
      data: replys,
    });
  }
);
export const replyController = {
  createReply,
  updateReply,
  deleteReply,
  getAllReplysByComment,
};
