interface Comment {
  id: number;
  projectId: string;
  userId: string;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}

export default Comment;
