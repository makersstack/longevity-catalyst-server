export type Admin = {
  id: number;
  username: string;
  email: string;
  password: string;
  role: string;
};
export interface AdminResponse {
  username: string;
  email: string;
  role: string;
}

export interface UpdateAdmin {
  username?: string;
  email?: string;
  role?: string;
}
