export interface IUser {
  name: string;
  email: string;
  password: string;
  company?: string | null;
  bio?: string | null;
  profile_photo?: string | null;
  created_at: Date;
  updated_at: Date;
}

export type IResponse = {
  name: string;
  email: string;
  company?: string | null;
  bio?: string | null;
  profile_photo?: string | null;
  created_at: Date;
};
