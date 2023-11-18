/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import { Op } from "sequelize";
import ApiError from "../../../errors/ApiError";
import { paginationHelpers } from "../../../helpers/paginationHelpers";
import { utilities } from "../../../helpers/utilities";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptons } from "../../../interfaces/pagination";
import { User } from "../user/user.model";
import { projectSearchableFields } from "./project.constant";
import {
  IApiResponseProjectData,
  IProjectFilters,
  ProjectData,
} from "./project.interface";
import { Project } from "./project.model";

const createProject = async (
  token: string,
  projectData: ProjectData
): Promise<ProjectData | null> => {
  const isAuthorized = utilities.verifiedTokenAndDb(token);
  if (!isAuthorized) {
    throw new ApiError(httpStatus.FORBIDDEN, "Unauthorized!");
  }

  const userInfo = (await utilities.tokenToUserInfo(token)) as any;

  if (!userInfo) {
    throw new ApiError(httpStatus.NOT_FOUND, "Your Not Found");
  }

  const authorId: number = userInfo.id;

  projectData.authorId = authorId;

  const createdProject = await Project.create(
    projectData as IApiResponseProjectData
  );

  return createdProject.toJSON() as ProjectData;
};

const updateProject = async (
  projectId: string,
  projectData: ProjectData
): Promise<ProjectData | null> => {
  const project = await Project.findByPk(Number(projectId));
  if (!project) {
    throw new ApiError(httpStatus.NOT_FOUND, "Project Not Found");
  }
  await Project.update(projectData, {
    where: { id: projectId },
  });

  const updateGetData = await Project.findOne({ where: { id: projectId } });

  if (!updateGetData) {
    throw new ApiError(httpStatus.NOT_FOUND, "Not Found");
  }

  const userSkillsPlainData = updateGetData.toJSON() as ProjectData;
  return userSkillsPlainData;
};

const deleteProject = async (projectId: string) => {
  const project = await Project.findByPk(Number(projectId));
  if (project) {
    await project.destroy();
    return project;
  }
  return null;
};
// For search and filter http://localhost:5000/api/v1/projects?downVoteCount=2&searchTerm=C%20Sample

// Via Sort By and Sort order http://localhost:5000/api/v1/projects?sortBy=upVoteCount&sortOrder=desc

// For sorting Every sorting separeted endpoint and with this filter data it's great point

const getAllProjects = async (
  filters: IProjectFilters,
  paginationOptions: IPaginationOptons
) => {
  // For Search
  const { searchTerm, ...filtersData } = filters;
  const andCondition = [];
  if (searchTerm) {
    andCondition.push({
      [Op.or]: projectSearchableFields.map((field) => ({
        [field]: {
          [Op.like]: `%${searchTerm.toLowerCase()}%`,
        },
      })),
    });
  }

  // For Filter
  if (Object.keys(filtersData).length) {
    andCondition.push({
      [Op.and]: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }
  // For Pagination
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const options = {
    where: {
      [Op.and]: andCondition,
    },
    offset: skip,
    limit,
    order: [] as [string, string][],
    include: User,
  };

  if (sortBy && sortOrder) {
    options.order.push([sortBy, sortOrder]);
  }

  const result = await Project.findAndCountAll(options);

  const total = result.count;

  const responseData: IGenericResponse<Project[]> = {
    meta: {
      page,
      limit,
      total,
    },
    data: result.rows,
  };
  return responseData;
};

const getSingleProject = async (token: string, projectId: number) => {
  const getUserInfo = utilities.tokenToUserInfo(token);
  if (!getUserInfo) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized!");
  }
  const project = await Project.findByPk(projectId, {
    include: [
      {
        model: User,
        attributes: {
          exclude: ["password"],
        },
      },
    ],
  });

  if (!project) {
    throw new ApiError(httpStatus.NOT_FOUND, "Project not found");
  }

  return project;
};
const getAllProjectsForDashboard = async (
  filters: IProjectFilters,
  paginationOptions: IPaginationOptons
) => {
  // For Search
  const { searchTerm, ...filtersData } = filters;
  const andCondition = [];
  if (searchTerm) {
    andCondition.push({
      [Op.or]: projectSearchableFields.map((field) => ({
        [field]: {
          [Op.like]: `%${searchTerm.toLowerCase()}%`,
        },
      })),
    });
  }

  // For Filter
  if (Object.keys(filtersData).length) {
    andCondition.push({
      [Op.and]: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }
  // For Pagination
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const options = {
    where: {
      [Op.and]: andCondition,
    },
    offset: skip,
    limit,
    order: [] as [string, string][],
    include: User,
  };

  if (sortBy && sortOrder) {
    options.order.push([sortBy, sortOrder]);
  }

  const projects = (await Project.findAndCountAll(options)) as any;

  const total = projects.count;

  const formattedProjects = projects.rows.map((project: any) => {
    return {
      id: project.id,
      projectTitle: project.projectTitle,
      user: {
        id: project.User.id,
        userName: project.User.userName,
        userImage: project.User.profile_photo,
      },
    };
  });

  const responseData = {
    meta: {
      page,
      limit,
      total,
    },
    data: formattedProjects,
  };
  return responseData;
};

export const ProjectService = {
  createProject,
  getAllProjects,
  getAllProjectsForDashboard,
  getSingleProject,
  updateProject,
  deleteProject,
};
