import express from "express";
import { replyController } from "./reply.controller";

const router = express.Router();

// Define routes
router.post("/", replyController.createReply);
router.get("/:id", replyController.getSingleReply);
router.delete("/:id", replyController.deleteReply);
router.patch("/:id", replyController.updateReply);

export const replyRoute = router;
