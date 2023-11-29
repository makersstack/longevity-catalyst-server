import express from "express";
import { AdminRoute } from "../modules/admin/admin.router";
import { AuthRoutes } from "../modules/auth/auth.route";
import { categoryRoute } from "../modules/projects/categories/categories.route";
import { commentRoute } from "../modules/projects/comments/comments.route";
import { projectCategoryRoute } from "../modules/projects/porojectCategory/projectCategory.route";
import { ProjectRouter } from "../modules/projects/project.route";
import { replyRoute } from "../modules/projects/reply/reply.route";
import { userSkillRoute } from "../modules/skills/skills.route";
import { imageRoute } from "../modules/user/imageController";
import { userSocailRoute } from "../modules/user/user-activities/socail.router";
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
    path: "/project",
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
  {
    path: "/categories",
    route: categoryRoute,
  },
  {
    path: "/category/project",
    route: projectCategoryRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
