import express from "express";
import { AdminRoute } from "../modules/admin/admin.router";
import { AuthRoutes } from "../modules/auth/auth.route";
import { ProjectRouter } from "../modules/projects/project.route";
import { imageRoute } from "../modules/user/imageController";
import { UserRoutes } from "../modules/user/user.router";

const router = express.Router();
const moduleRoutes = [
  {
    path: "/admin",
    route: AdminRoute,
  },
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  // {
  //   path: "/skills",
  //   route: userSkillRoute,
  // },
  // {
  //   path: "/socail",
  //   route: userSocailRoute,
  // },
  {
    path: "/projects",
    route: ProjectRouter,
  },
  // {
  //   path: "/comment",
  //   route: commentRoute,
  // },
  // {
  //   path: "/reply",
  //   route: replyRoute,
  // },
  {
    path: "/upload",
    route: imageRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
