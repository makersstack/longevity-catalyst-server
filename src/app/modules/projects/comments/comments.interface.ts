interface Comment {
  id: number;
  projectId: string;
  userId: string;
  commentText: string;
  createdAt: Date;
  updatedAt: Date;
}

export type commentResponse = {
  projectId: number;
  commentText: string;
};

export default Comment;
