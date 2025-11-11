import { UserRegisterDto } from "./dto/user-register.dto";
import { UserModel } from "@prisma/client";
import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import { IConfigService } from "../../config/config.service.interface";
import { IUserService } from "./users.service.interface";
import { IUserRepository } from "./users.repository.interface";
import { User } from "./user.entity";
import { UserLoginDto } from "./dto/user-login.dto";

@injectable()
export class UserService implements IUserService {
  constructor(@inject(TYPES.ConfigService) private configService: IConfigService, @inject(TYPES.UserRepository) private userRepository: IUserRepository) {}

  async createUserService({ email, password }: UserRegisterDto): Promise<UserModel | null> {
    const newUser = new User(email);
    const salt = this.configService.get("SALT");
    await newUser.setPassword(password, Number(salt));

    const existedUser = await this.userRepository.findRepository(email);
    if (existedUser) {
      return null;
    }
    return this.userRepository.createUserRepository(newUser);
  }

  async validateUserService({ email, password }: UserLoginDto): Promise<boolean> {
    const existedUser = await this.userRepository.findRepository(email);
    if (!existedUser) {
      return false;
    }
    const newUser = new User(existedUser.email, existedUser.role, existedUser.password);

    return newUser.comparePassword(password);
  }

  async deleteEmailService(email: string): Promise<{ count: number }> {
    const existedUser = await this.userRepository.findRepository(email);
    if (!existedUser) {
      return { count: 0 };
    }
    return await this.userRepository.deleteEmailRepository(email);
  }

  async deleteAllAdminsService(): Promise<{ count: number }> {
    return await this.userRepository.deleteAllAdminsRepository();
  }

  async getUserInfo(email: string): Promise<UserModel | null> {
    return this.userRepository.findRepository(email);
  }

  async getUsersService(): Promise<UserModel[]> {
    return await this.userRepository.getUsersRepository();
  }

  async getUserService(email: string): Promise<UserModel | null> {
    try {
      return await this.userRepository.getUserRepository(email);
    } catch (error) {
      console.error("Error getting user:", error);
      return null;
    }
  }
}
