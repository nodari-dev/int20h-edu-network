export interface IUser {
  id: number;
  email: string;
  createdAt?: string;
  updatedAt?: string;
  name: string;
  lastName: string;
  role: Role | null;
}

export type Role = "ADMIN" | "TEACHER" | "STUDENT";

export enum ROLE {
  ADMIN = "ADMIN",
  TEACHER = "TEACHER",
  STUDENT = "STUDENT"
}