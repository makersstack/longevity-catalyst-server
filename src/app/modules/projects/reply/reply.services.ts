/* eslint-disable @typescript-eslint/no-explicit-any */

import Reply from "./reply.model";

export const createReply = async (replyData: any) => {
  return Reply.create(replyData);
};

export const updateReply = async (replyId: string, replyData: any) => {
  const reply = await Reply.findByPk(Number(replyId));
  if (reply) {
    await reply.update(replyData);
    return reply;
  }
  return null;
};

export const deleteReply = async (replyId: string) => {
  const reply = await Reply.findByPk(Number(replyId));
  if (reply) {
    await reply.destroy();
    return reply;
  }
  return null;
};

export const getSingleProject = async (projectId: string) => {
  return Reply.findByPk(Number(projectId));
};

export const replyService = {
  createReply,
  getSingleProject,
  updateReply,
  deleteReply,
};
