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
    ENUM_USER_ROLE.REGULARUSER,
    ENUM_USER_ROLE.ADMIN
  ),
  commentController.createComment
);
router.get(
  "/:projectId/comments",
  auth(
    ENUM_USER_ROLE.REGULARUSER,
    ENUM_USER_ROLE.RESEARCHER,
    ENUM_USER_ROLE.CONTRIBUTOR,
    ENUM_USER_ROLE.ADMIN
  ),
  // TODO NEED WORK
  commentController.getAllCommentByProject
);
router.delete(
  "/comment/:commentId",
  auth(
    ENUM_USER_ROLE.REGULARUSER,
    ENUM_USER_ROLE.CONTRIBUTOR,
    ENUM_USER_ROLE.RESEARCHER,
    ENUM_USER_ROLE.ADMIN
  ),
  commentController.deleteComment
);
router.patch(
  "/:projectId/comment/:commentId",
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
router.get("/:id", replyController.getSingleReply);
router.delete("/:id", replyController.deleteReply);
router.patch("/:id", replyController.updateReply);

export const commentRoute = router;
