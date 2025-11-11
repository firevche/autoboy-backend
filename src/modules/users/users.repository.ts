import { UserModel } from "@prisma/client";
import { inject, injectable } from "inversify";
import "reflect-metadata";
import { IUserRepository } from "./users.repository.interface";
import { TYPES } from "../../types";
import { ILogger } from "../../log/logger.interface";
import { PrismaService } from "../../database/prisma.service";
import { User } from "./user.entity";

@injectable()
export class UserRepository implements IUserRepository {
  constructor(@inject(TYPES.ILogger) private loggerService: ILogger, @inject(TYPES.PrismaService) private prismaService: PrismaService) {}

  async createUserRepository({ email, password, role }: User): Promise<UserModel> {
    return await this.prismaService.client.userModel.create({
      data: {
        email,
        password,
        role,
      },
    });
  }

  async deleteEmailRepository(email: string): Promise<{ count: number }> {
    const result = await this.prismaService.client.userModel.deleteMany({
      where: {
        email,
      },
    });
    return { count: result ? 1 : 0 };
  }

  async deleteAllAdminsRepository(): Promise<{ count: number }> {
    const result = await this.prismaService.client.userModel.deleteMany();
    return { count: result.count };
  }

  async findRepository(email: string): Promise<UserModel | null> {
    return this.prismaService.client.userModel.findFirst({
      where: {
        email,
      },
    });
  }
  async getUsersRepository(): Promise<UserModel[]> {
    return await this.prismaService.client.userModel.findMany();
  }

  async getUserRepository(email: string): Promise<UserModel | null> {
    if (!email) {
      throw new Error("Email is required for finding a user");
    }
    return await this.prismaService.client.userModel.findUnique({
      where: {
        email,
      },
    });
  }
}
