/* eslint-disable @typescript-eslint/no-explicit-any */
import Project from "./project.model";

export const createProject = async (projectData: any) => {
  return Project.create(projectData);
};

export const updateProject = async (projectId: string, projectData: any) => {
  const project = await Project.findByPk(Number(projectId));
  if (project) {
    await project.update(projectData);
    return project;
  }
  return null;
};

export const deleteProject = async (projectId: string) => {
  const project = await Project.findByPk(Number(projectId));
  if (project) {
    await project.destroy();
    return project;
  }
  return null;
};

export const getAllProjects = async () => {
  return Project.findAll();
};

export const getSingleProject = async (projectId: string) => {
  return Project.findByPk(Number(projectId));
};

export const ProjectService = {
  createProject,
  getAllProjects,
  getSingleProject,
  updateProject,
  deleteProject,
};
