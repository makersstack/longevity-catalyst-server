import express from "express";
import { ENUM_USER_ROLE } from "../../../enums/user";
import auth from "../../middlewares/auth";
import { projectController } from "./project.controller";

const router = express.Router();

// Define routes
router.get("/", projectController.getAllProjects);
router.get("/user", projectController.getAllProjectsByUser);
router.get("/:id", projectController.getSingleProject);
router.get("/user/:username", projectController.getAllProjectsByUsername);

router.post(
  "/create",
  auth(ENUM_USER_ROLE.CONTRIBUTOR, ENUM_USER_ROLE.RESEARCHER),
  projectController.createProject
);
router.delete(
  "/:id/delete",
  auth(
    ENUM_USER_ROLE.CONTRIBUTOR,
    ENUM_USER_ROLE.RESEARCHER,
    ENUM_USER_ROLE.ADMIN
  ),
  projectController.deleteProject
);
router.patch(
  "/:id/update",
  auth(
    ENUM_USER_ROLE.RESEARCHER,
    ENUM_USER_ROLE.CONTRIBUTOR,
    ENUM_USER_ROLE.ADMIN
  ),
  projectController.updateProject
);

export const ProjectRouter = router;
