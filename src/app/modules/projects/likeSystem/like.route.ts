import express from "express";
import { ENUM_USER_ROLE } from "../../../../enums/user";
import auth from "../../../middlewares/auth";
import { likeController } from "./like.controller";

const router = express.Router();

// projects like operation
router.post(
  "/project",
  auth(
    ENUM_USER_ROLE.REGULARUSER,
    ENUM_USER_ROLE.CONTRIBUTOR,
    ENUM_USER_ROLE.RESEARCHER,
    ENUM_USER_ROLE.ADMIN
  ),
  likeController.projectLikeOperation
);

// Define routes
// router.post("/", likeController.createOrRemoveLike);
router.get("/", likeController.getAllLikesByPost);

export const LikeRouter = router;
