interface Reply {
  id: number;
  projectId: string;
  userId: string;
  commentId: string;
  replyText: string;
  createdAt: Date;
  updatedAt: Date;
}

export default Reply;
