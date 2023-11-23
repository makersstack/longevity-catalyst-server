/* eslint-disable @typescript-eslint/no-explicit-any */

import { ProjectCategory } from "./projectCategory.model";

const getAllProjectCategories = async () => {
  const cate = await ProjectCategory.findAll();
  return cate;
};

export const ProjectCategoriesService = {
  getAllProjectCategories,
};
