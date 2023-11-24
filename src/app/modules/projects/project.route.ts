import express from "express";
import { ENUM_USER_ROLE } from "../../../enums/user";
import auth from "../../middlewares/auth";
import { likeController } from "./likeSystem/like.controller";
import { projectController } from "./project.controller";

const router = express.Router();

// Define routes
router.get("/", projectController.getAllProjects);
router.get("/user", projectController.getAllProjectsByUser);
router.get("/:id", projectController.getSingleProject);
router.get("/user/:username", projectController.getAllProjectsByUsername);

router.post("/create", projectController.createProject);
router.delete(
  "/:id",
  auth(
    ENUM_USER_ROLE.REGULARUSER,
    ENUM_USER_ROLE.CONTRIBUTOR,
    ENUM_USER_ROLE.ADMIN
  ),
  projectController.deleteProject
);
router.patch(
  "/:id",
  auth(
    ENUM_USER_ROLE.REGULARUSER,
    ENUM_USER_ROLE.CONTRIBUTOR,
    ENUM_USER_ROLE.ADMIN
  ),
  projectController.updateProject
);

// LikeSyste
router.post("/:id/like", likeController.createOrRemoveLike);

export const ProjectRouter = router;
