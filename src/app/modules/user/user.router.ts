import express from "express";
import { UserController } from "./user.controller";

const router = express.Router();

// Define routes
router.get("/", UserController.getAllUsers);
router.get("/:username", UserController.getUserByUserName);
router.get("/profile/:id", UserController.getUserInfoById);
router.patch("/:username", UserController.updateUser);

export const UserRoutes = router;
