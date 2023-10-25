export interface IUser {
  id: number;
  full_name: string;
  username: string;
  role: string;
  email: string;
  password: string;
  company?: string | null;
  bio?: string | null;
  profile_photo?: string | null;
  created_at: Date;
  updated_at: Date;
}

export type IResponse = {
  id: number;
  full_name: string;
  username: string;
  role: string;
  email: string;
  company?: string | null;
  bio?: string | null;
  profile_photo?: string | null;
  created_at: Date;
  updated_at: Date;
};
