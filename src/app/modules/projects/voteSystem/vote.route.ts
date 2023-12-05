import express from "express";
import { VoteController } from "./vote.controller";

const router = express.Router();

// projects like operation
router.post("/project", VoteController.projectVoteOperation);

// Define routes
router.post("/", VoteController.createOrRemoveVote);
router.get("/", VoteController.getAllVoteByPost);

export const VoteRouter = router;
