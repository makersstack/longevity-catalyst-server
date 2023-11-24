/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { paginationFileds } from "../../../constants/pagination";
import ApiError from "../../../errors/ApiError";
import { utilities } from "../../../helpers/utilities";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { projectFilterableFields } from "./project.constant";
import { ProjectData } from "./project.interface";
import { ProjectService } from "./project.services";

const createProject = catchAsync(async (req: Request, res: Response) => {
  const ReqprojectData = req.body;
  const token = req.headers.authorization;
  if (!token) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "Unauthorized access. Please log in."
    );
  }
  const isAuthorized = utilities.verifiedTokenAndDb(token);
  if (!isAuthorized) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized!");
  }
  console.log(ReqprojectData);
  const project = await ProjectService.createProject(token, ReqprojectData);

  sendResponse<ProjectData>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Project created successfully!",
    data: project,
  });
});

const updateProject = catchAsync(async (req: Request, res: Response) => {
  const projectId = req.params.id;
  const projectData = req.body;
  const token = req.headers.authorization;
  if (!token) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "Unauthorized access. Please log in."
    );
  }
  const isAuthorized = utilities.verifiedTokenAndDb(token);
  if (!isAuthorized) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized!");
  }

  const updatedProject = await ProjectService.updateProject(
    projectId,
    projectData
  );

  if (!updatedProject) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Resource not available. Please verify your request"
    );
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Project details have been successfully updated.",
    data: updatedProject,
  });
});

const deleteProject = catchAsync(async (req: Request, res: Response) => {
  const projectId = req.params.id;
  const token = req.headers.authorization;
  if (!token) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "Unauthorized access. Please log in."
    );
  }
  const isAuthorized = utilities.verifiedTokenAndDb(token);
  if (!isAuthorized) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized!");
  }
  const deletedProject = await ProjectService.deleteProject(projectId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Project Deleted Successfully",
    data: deletedProject,
  });
});

const getAllProjects = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const filters = pick(req.query, projectFilterableFields);
    const paginationOptions = pick(req.query, paginationFileds);
    const token = req.headers.authorization;
    // if (!token) {
    //   throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized!");
    // }

    // const isAuthorized = utilities.verifiedTokenAndDb(token);
    // if (!isAuthorized) {
    //   throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized!");
    // }

    const result = await ProjectService.getAllProjects(
      filters,
      paginationOptions
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Projects retrieved successfully",
      meta: result.meta,
      data: result.data,
    });
  }
);

const getAllProjectsByUsername = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const filters = pick(req.query, projectFilterableFields);
    const paginationOptions = pick(req.query, paginationFileds);
    const token = req.headers.authorization;
    const username = String(req.params.username);
    if (!username) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized!");
    }

    const result = await ProjectService.getAllProjectsByUsername(
      filters,
      paginationOptions,
      username
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Projects retrieved successfully",
      meta: result.meta,
      data: result.data,
    });
  }
);

const getSingleProject = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  const projectId = Number(req.params.id);

  if (!token) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized!");
  }

  const isAuthorized = utilities.verifiedTokenAndDb(token);
  if (!isAuthorized) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "Unauthorized access. Please log in."
    );
  }

  const project = await ProjectService.getSingleProject(token, projectId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User retrive success full",
    data: project,
  });
});

const getAllProjectsByUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const paginationOptions = pick(req.query, paginationFileds);

    const result = await ProjectService.getAllProjectsByUser(paginationOptions);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Projects retrieved successfully",
      meta: result.meta,
      data: result.data,
    });
  }
);

export const projectController = {
  createProject,
  updateProject,
  getAllProjects,
  getAllProjectsByUsername,
  getAllProjectsByUser,
  getSingleProject,
  deleteProject,
};
