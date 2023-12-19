import express from "express";
import { ENUM_USER_ROLE } from "../../../../enums/user";
import auth from "../../../middlewares/auth";
import { replyController } from "../reply/reply.controller";
import { commentController } from "./comments.controller";

const router = express.Router();

// Define routes
router.post(
  "/:projectId/comment",
  auth(
    ENUM_USER_ROLE.REGULARUSER,
    ENUM_USER_ROLE.CONTRIBUTOR,
    ENUM_USER_ROLE.RESEARCHER,
    ENUM_USER_ROLE.ADMIN
  ),
  commentController.createComment
);
router.get("/:projectId/comments", commentController.getAllCommentByProject);
router.delete(
  "/comment/delete/:commentId",
  auth(
    ENUM_USER_ROLE.REGULARUSER,
    ENUM_USER_ROLE.CONTRIBUTOR,
    ENUM_USER_ROLE.RESEARCHER,
    ENUM_USER_ROLE.ADMIN
  ),
  commentController.deleteComment
);
router.patch(
  "/comment/:commentId/update",
  auth(
    ENUM_USER_ROLE.REGULARUSER,
    ENUM_USER_ROLE.CONTRIBUTOR,
    ENUM_USER_ROLE.RESEARCHER,
    ENUM_USER_ROLE.ADMIN
  ),
  commentController.updateComment
);

// For Reply
router.post(
  "/:projectId/comment/:commentId/reply",
  replyController.createReply
);
router.get("/:commentId/replay", replyController.getAllReplysByComment);
router.delete("/replay/delete/:replyId", replyController.deleteReply);
router.patch("/replay/:replyId/update", replyController.updateReply);

export const commentRoute = router;
