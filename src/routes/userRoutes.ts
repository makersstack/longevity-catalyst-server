import express from "express";
import {
  createUser,
  getUserById,
  getUsers,
} from "../controllers/userController";

const router = express.Router();

// Create a new user
router.post("/signup", createUser);

// Get all users
router.get("/", getUsers);

// Get a user by ID
router.get("/:id", getUserById);

export default router;
