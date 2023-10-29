import Comment from "./comments.model";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const createComment = async (commentData: any) => {
  return Comment.create(commentData);
};

export const updateComment = async (projectId: string, commentData: any) => {
  const project = await Comment.findByPk(Number(projectId));
  if (project) {
    await project.update(commentData);
    return project;
  }
  return null;
};

export const deleteComment = async (projectId: string) => {
  const project = await Comment.findByPk(Number(projectId));
  if (project) {
    await project.destroy();
    return project;
  }
  return null;
};

export const getSingleComment = async (projectId: string) => {
  return Comment.findByPk(Number(projectId));
};

export const commentService = {
  createComment,
  getSingleComment,
  updateComment,
  deleteComment,
};
