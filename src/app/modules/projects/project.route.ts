import express from "express";
import { projectController } from "./project.controller";

const router = express.Router();

// Define routes
router.get("/", projectController.getAllProjects);
router.post("/create-project", projectController.createProject);
router.get("/:id", projectController.getSingleProject);
router.delete("/:id", projectController.deleteProject);
router.patch("/:id", projectController.updateProject);

export const ProjectRouter = router;
