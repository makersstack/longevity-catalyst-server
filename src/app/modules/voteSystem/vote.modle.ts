import { DataTypes, Model, Sequelize } from "sequelize";
import VoteAttributes from "./vote.interface";

class VoteModel extends Model {
  public id!: number;
  public userId!: number;
  public votedItemId!: number; // You can change this to match your voted items, e.g., a comment or a project
  public voteType!: "up" | "down"; // You can customize the vote types
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

const defineVoteModel = (sequelize: Sequelize) => {
  VoteModel.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      votedItemId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      voteType: {
        type: DataTypes.ENUM("up", "down"),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Vote",
      tableName: "votes",
    }
  );
};

interface VoteInstance extends Model<VoteAttributes>, VoteAttributes {}

export { VoteInstance, defineVoteModel };
