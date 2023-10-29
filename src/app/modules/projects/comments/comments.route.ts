import express from "express";
import { commentController } from "./comments.controller";

const router = express.Router();

// Define routes
router.post("/", commentController.createComment);
router.get("/:id", commentController.getSingleComment);
router.delete("/:id", commentController.deleteComment);
router.patch("/:id", commentController.updateComment);

export const commentRoute = router;
