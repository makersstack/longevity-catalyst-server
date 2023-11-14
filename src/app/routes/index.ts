import express from "express";
import { AdminRoute } from "../modules/admin/admin.router";
import { AuthRoutes } from "../modules/auth/auth.route";
import { commentRoute } from "../modules/projects/comments/comments.route";
import { ProjectRouter } from "../modules/projects/project.route";
import { replyRoute } from "../modules/projects/reply/reply.route";
import { imageRoute } from "../modules/user/imageController";
import { userSkillRoute } from "../modules/user/user-skills/skills.route";
import { userSocailRoute } from "../modules/user/user-socail/socail.router";
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
  {
    path: "/skills",
    route: userSkillRoute,
  },
  {
    path: "/socail",
    route: userSocailRoute,
  },
  {
    path: "/projects",
    route: ProjectRouter,
  },
  {
    path: "/comment",
    route: commentRoute,
  },
  {
    path: "/reply",
    route: replyRoute,
  },
  {
    path: "/upload",
    route: imageRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
