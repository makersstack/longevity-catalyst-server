// src/validations/user.validation.ts
import { z } from "zod";

const userSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  company: z.string().optional(),
  bio: z.string().optional(),
  profile_photo: z.string().optional(),
});

const userUpdateSchema = z.object({
  name: z.string().min(3),
  company: z.string().optional(),
  bio: z.string().optional(),
  profile_photo: z.string().optional(),
});

export const UserValidation = {
  userSchema,
  userUpdateSchema,
};
