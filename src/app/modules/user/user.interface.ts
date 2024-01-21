export interface IUser {
  id: number;
  full_name: string;
  username: string;
  role: string;
  email: string;
  password: string;
  profileImage?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export type IResponse = {
  id: number;
  full_name: string;
  username: string;
  role: string;
  email: string;
  profileImage?: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export interface Subscribing {
  email: string;
}
export type ISubscribing = {
  email: string;
};
