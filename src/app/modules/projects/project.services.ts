/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import { Op } from "sequelize";
import ApiError from "../../../errors/ApiError";
import { paginationHelpers } from "../../../helpers/paginationHelpers";
import { utilities } from "../../../helpers/utilities";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptons } from "../../../interfaces/pagination";
import { User } from "../user/user.model";
import { Categories } from "./categories/categories.model";
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
    throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized!");
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
    include: [
      {
        model: User,
        attributes: {
          exclude: ["password"],
        },
      },
    ],
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

const getSingleProject = async (projectId: number) => {
  // const getUserInfo = utilities.tokenToUserInfo(token);
  // if (!getUserInfo) {
  //   throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized!");
  // }
  const project = await Project.findByPk(projectId, {
    include: [
      {
        model: User,
        attributes: {
          exclude: ["password"],
        },
      },
      {
        model: Categories,
      },
    ],
  });

  if (!project) {
    throw new ApiError(httpStatus.NOT_FOUND, "Project not found");
  }

  return project;
};

const getAllProjectsByUser = async (paginationOptions: IPaginationOptons) => {
  // For Pagination
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const options = {
    offset: skip,
    limit,
    order: [] as [string, string][],
    include: [
      {
        model: User,
        attributes: {
          exclude: ["password"],
        },
      },
    ],
  };

  if (sortBy && sortOrder) {
    options.order.push([sortBy, sortOrder]);
  }

  const projects = (await Project.findAndCountAll(options)) as any;

  const total = projects.count;

  const formattedProjects = projects.rows.map((project: any) => {
    return {
      id: project.id,
      project_name: project.project_name,
      project_desc: project.project_desc,
      createdAt: project.createdAt,
      commentsCount: project.commentsCount,
      sharesCount: project.sharesCount,
      User: {
        id: project.User.id,
        username: project.User.username,
        profileImage: project.User.profileImage,
        full_name: project.User.full_name,
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

// Not Perfectly Work
const getAllProjectsByUsername = async (
  userName: string,
  filters: IProjectFilters,
  paginationOptions: IPaginationOptons
) => {
  const user = await User.findOne({
    where: { username: userName },
    attributes: { exclude: ["password"] },
  });

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User Not Found");
  }
  const authorId = user?.id;

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
  interface WhereOptions {
    [key: string]: any;
  }
  const findOptions = {
    where: {} as WhereOptions,
    offset: skip,
    limit,
    order: [] as [string, string][],
    include: [
      {
        model: User,
        attributes: {
          exclude: ["password"],
        },
      },
    ],
  };

  if (authorId !== null) {
    findOptions.where.authorId = authorId;
  }

  if (sortBy && sortOrder) {
    findOptions.order.push([sortBy, sortOrder]);
  }
  findOptions.where = {
    ...findOptions.where,
    ...andCondition,
  };

  const result = await Project.findAndCountAll(findOptions);

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

export const ProjectService = {
  createProject,
  getAllProjects,
  getAllProjectsByUser,
  getSingleProject,
  updateProject,
  deleteProject,
  getAllProjectsByUsername,
};
