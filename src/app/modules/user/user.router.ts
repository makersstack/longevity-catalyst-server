import express from "express";
import { UserController } from "./user.controller";

const router = express.Router();

// Define routes
router.post("/user", UserController.createUser);
router.get("/", UserController.getUsers);
router.get("/:username", UserController.getUserByUserName);

export const UserRoutes = router;
