import express from "express";
import { userDetailsController } from "./userDetails.controller";
const router = express.Router();

router.post("/details/create", userDetailsController.createUserDetails);

router.get("/", userDetailsController.getAllUserDetails);

export const userSocailRoute = router;
