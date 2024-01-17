import express from "express";
import { AdminRoute } from "../modules/admin/admin.router";
import { AuthRoutes } from "../modules/auth/auth.route";
import { ProfileRouter } from "../modules/profile/profile.route";
import { categoryRoute } from "../modules/projects/categories/categories.route";
import { commentRoute } from "../modules/projects/comments/comments.route";
import { LikeRouter } from "../modules/projects/likeSystem/like.route";
import { projectCategoryRoute } from "../modules/projects/porojectCategory/projectCategory.route";
import { ProjectRouter } from "../modules/projects/project.route";
import { VoteRouter } from "../modules/projects/voteSystem/vote.route";
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

  {
    path: "/like",
    route: LikeRouter,
  },
  {
    path: "/vote",
    route: VoteRouter,
  },
  {
    path: "/profile",
    route: ProfileRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
