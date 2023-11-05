interface VoteAttributes {
  id: number;
  userId: number;
  votedItemId: number;
  voteType: "up" | "down";
  createdAt: Date;
  updatedAt: Date;
}

export default VoteAttributes;
