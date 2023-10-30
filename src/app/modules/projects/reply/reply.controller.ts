import { Request, Response } from "express";
import httpStatus from "http-status";
import ApiError from "../../../../errors/ApiError";
import catchAsync from "../../../../shared/catchAsync";
import sendResponse from "../../../../shared/sendResponse";
import { replyService } from "./reply.services";

const createProject = catchAsync(async (req: Request, res: Response) => {
  try {
    const commentData = req.body;
    const comment = await replyService.createReply(commentData);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Reply Created successfully!",
      data: comment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const updateReply = catchAsync(async (req: Request, res: Response) => {
  try {
    const projectId = req.params.id;
    const projectData = req.body;
    const updatedReply = await replyService.updateReply(projectId, projectData);
    if (updatedReply) {
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Reply Data Update successfully!",
        data: updatedReply,
      });
    } else {
      throw new ApiError(httpStatus.BAD_REQUEST, "Project not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const deleteReply = catchAsync(async (req: Request, res: Response) => {
  try {
    const projectId = req.params.id;
    const deletedProject = await replyService.deleteReply(projectId);
    if (deletedProject) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: "Project not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const getSingleReply = catchAsync(async (req: Request, res: Response) => {
  try {
    const replyId = req.params.id;
    const project = await replyService.getSingleProject(replyId);
    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({ error: "Project not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export const replyController = {
  createProject,
  updateReply,
  deleteReply,
  getSingleReply,
};
