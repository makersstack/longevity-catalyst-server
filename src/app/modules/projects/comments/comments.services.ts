import Comment from "./comments.model";

/* eslint-disable @typescript-eslint/no-explicit-any */
const createComment = async (commentData: any) => {
  return Comment.create(commentData);
};

const updateComment = async (projectId: string, commentData: any) => {
  const project = await Comment.findByPk(Number(projectId));
  if (project) {
    await project.update(commentData);
    return project;
  }
  return null;
};

const deleteComment = async (projectId: string) => {
  const project = await Comment.findByPk(Number(projectId));
  if (project) {
    await project.destroy();
    return project;
  }
  return null;
};

const getSingleComment = async (projectId: string) => {
  return Comment.findByPk(Number(projectId));
};

export const commentService = {
  createComment,
  getSingleComment,
  updateComment,
  deleteComment,
};
