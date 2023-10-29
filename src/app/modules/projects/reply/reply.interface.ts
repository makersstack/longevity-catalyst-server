interface Reply {
  id: number;
  projectId: string;
  userId: string;
  commentId: string;
  reply: string;
  createdAt: Date;
  updatedAt: Date;
}

export default Reply;
