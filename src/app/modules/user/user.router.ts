import express from "express";
import { ENUM_USER_ROLE } from "../../../enums/user";
import auth from "../../middlewares/auth";
import upload from "../../middlewares/multer";
import { userDetailsController } from "./user-details/userDetails.controller";
import { UserController } from "./user.controller";

const router = express.Router();

// Define routes
router.get("/", UserController.getAllUsers);
router.get("/:username", UserController.getUserByUserName);
router.get("/profile/:id", UserController.getUserInfoById);
router.patch(
  "/:username/update",
  auth(
    ENUM_USER_ROLE.REGULARUSER,
    ENUM_USER_ROLE.CONTRIBUTOR,
    ENUM_USER_ROLE.RESEARCHER,
    ENUM_USER_ROLE.ADMIN
  ),
  upload.single("profileImage"),
  UserController.updateUser
);
router.delete("/:id/delete", UserController.deleteUser);

router.post("/subscriptions", UserController.userSubscriBing);
router.get("/details", userDetailsController.getAllUserDetails);

export const UserRoutes = router;
