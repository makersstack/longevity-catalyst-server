import express from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { ProjectRouter } from "../modules/projects/project.route";
import { userSkillRoute } from "../modules/user/user-skills/skills.route";
import { UserRoutes } from "../modules/user/user.router";

const router = express.Router();
const moduleRoutes = [
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
    path: "/projects",
    route: ProjectRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
