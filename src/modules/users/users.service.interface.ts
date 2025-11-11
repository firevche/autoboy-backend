import { UserModel } from "@prisma/client";
import { UserRegisterDto } from "./dto/user-register.dto";
import { UserLoginDto } from "./dto/user-login.dto";

export interface IUserService {
  createUserService: (dto: UserRegisterDto) => Promise<UserModel | null>;
  validateUserService: (dto: UserLoginDto) => Promise<boolean>;
  getUsersService: () => Promise<UserModel[]>;
  getUserInfo(email: string): Promise<UserModel | null>;
  getUserService: (email: string) => Promise<UserModel | null>;
  deleteAllAdminsService: () => Promise<{ count: number }>;
  deleteEmailService: (email: string) => Promise<{ count: number }>;
}
