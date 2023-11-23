import express from "express";
import { projectCategoryController } from "./projectCategory.controller";

const router = express.Router();

// Define routes
router.get("/", projectCategoryController.getAllProjectsCategories);

export const projectCategoryRoute = router;
