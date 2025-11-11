import { UserModel } from "@prisma/client";
import { User } from "./user.entity";

export interface IUserRepository {
  createUserRepository: (user: User) => Promise<UserModel>;
  getUserRepository: (email: string) => Promise<UserModel | null>;
  getUsersRepository: () => Promise<UserModel[]>;
  findRepository: (email: string) => Promise<UserModel | null>;
  deleteAllAdminsRepository: () => Promise<{ count: number }>;
  deleteEmailRepository: (email: string) => Promise<{ count: number }>;
}
