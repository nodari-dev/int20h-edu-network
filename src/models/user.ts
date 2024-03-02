export interface IUser {
  id: number;
  email: string;
  createdAt?: string;
  updatedAt?: string;
  name: string;
  lastName: string;
  role: Role | null;
}


export type Role = "Admin" | "Teacher" | "Student";

export enum ROLE {
  ADMIN = "Admin",
  TEACHER = "Teacher",
  STUDENT = "Student"
}