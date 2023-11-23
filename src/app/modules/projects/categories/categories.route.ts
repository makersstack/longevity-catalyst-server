import express from "express";
import { categoryController } from "./categories.controller";

const router = express.Router();

// Define routes
router.get("/", categoryController.getAllCategories);

export const categoryRoute = router;
