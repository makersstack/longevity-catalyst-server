import express from "express";
import { UserController } from "./user.controller";

const router = express.Router();

// Define routes
router.post("/user", UserController.createUser);
router.get("/user", UserController.getUsers);

export const UserRoutes = router;
