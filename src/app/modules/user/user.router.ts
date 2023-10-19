import express from "express";
const router = express.Router();

import { getUsers } from "./user.controller";

// // Create a new user
// // router.post("/signup", createUser);

// // Get all users
router.get("/all", getUsers);

// // Get a user by ID
// // router.get("/:id", getUserById);

export const UserRoutes = router;
