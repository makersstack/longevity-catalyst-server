/* eslint-disable @typescript-eslint/no-explicit-any */
import { Op } from "sequelize";
import { paginationHelpers } from "../../../helpers/paginationHelpers";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptons } from "../../../interfaces/pagination";
import { projectSearchableFields } from "./project.constant";
import { IProjectFilters } from "./project.interface";
import { Project } from "./project.model";

const createProject = async (projectData: any) => {
  return Project.create(projectData);
};

const updateProject = async (projectId: string, projectData: any) => {
  const project = await Project.findByPk(Number(projectId));
  if (project) {
    await project.update(projectData);
    return project;
  }
  return null;
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

const getSingleProject = async (projectId: string) => {
  return Project.findByPk(Number(projectId));
};

export const ProjectService = {
  createProject,
  getAllProjects,
  getSingleProject,
  updateProject,
  deleteProject,
};
