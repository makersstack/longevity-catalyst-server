import express from "express";
import { likeController } from "./like.controller";

const router = express.Router();

// Define routes
router.post("/", likeController.createOrRemoveLike);
router.get("/", likeController.getAllLikesByPost);

export const LikeRouter = router;
