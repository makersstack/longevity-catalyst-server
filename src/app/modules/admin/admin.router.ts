import express from "express";
import { adminController } from "./admin.controller";

const router = express.Router();

// Define routes
router.post("/", adminController.createAdmin);

export const AdminRoute = router;
