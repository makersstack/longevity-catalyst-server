/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { Admin } from "./admin.interface";
import AdminModel from "./admin.model";

const createAdmin = async (adminData: Admin): Promise<Admin | null> => {
  if (!adminData) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Sorry Not found");
  }

  const result = await AdminModel.create(adminData);
  const adminPlainData = result.toJSON() as Admin;
  return adminPlainData;
};

export const adminServices = {
  createAdmin,
};
