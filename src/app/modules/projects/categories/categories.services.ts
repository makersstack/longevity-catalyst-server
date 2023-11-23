/* eslint-disable @typescript-eslint/no-explicit-any */

import { Categories } from "./categories.model";

const getAllCategories = async () => {
  const categ = await Categories.findAll();

  return categ;
};

export const CategoriesService = {
  getAllCategories,
};
