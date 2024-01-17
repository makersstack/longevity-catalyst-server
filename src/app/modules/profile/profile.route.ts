import express from "express";
import { ENUM_USER_ROLE } from "../../../enums/user";
import auth from "../../middlewares/auth";
import { followController } from "./follow/folllow.controller";
import { notificationController } from "./notification/notification.controller";

const router = express.Router();

// Profile notification
router.post(
  "/set/notification",
  auth(
    ENUM_USER_ROLE.REGULARUSER,
    ENUM_USER_ROLE.CONTRIBUTOR,
    ENUM_USER_ROLE.RESEARCHER,
    ENUM_USER_ROLE.ADMIN
  ),
  notificationController.profileNotificationOperation
);

// Profile follow
router.post(
  "/set/follow",
  auth(
    ENUM_USER_ROLE.REGULARUSER,
    ENUM_USER_ROLE.CONTRIBUTOR,
    ENUM_USER_ROLE.RESEARCHER,
    ENUM_USER_ROLE.ADMIN
  ),
  followController.profileFollowOperation
);

export const ProfileRouter = router;
