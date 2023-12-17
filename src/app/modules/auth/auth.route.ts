import express from "express";
import upload from "../../middlewares/multer";
import { UserController } from "../user/user.controller";
import { AuthController } from "./auth.controller";
const router = express.Router();

router.post("/login", AuthController.loginUser);
router.post(
  "/signup",
  upload.single("profileImage"),
  UserController.createUser
);

router.post("/refresh-token", AuthController.refreshToken);
router.post("/logout", AuthController.logoutUser);

export const AuthRoutes = router;
