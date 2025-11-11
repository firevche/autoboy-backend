import { inject, injectable } from "inversify";
import "reflect-metadata";
import { TYPES } from "../../types";
import { ILogger } from "../../log/logger.interface";
import { PrismaService } from "../../database/prisma.service";
import { IConsultantsRepository } from "./consultants.repository.interface";
import { ConsultantsDto } from "./dto/consultants-edit.dto";
import { ConsultantsLeftModel, ConsultantsRightModel } from "@prisma/client";

@injectable()
export class ConsultantsRepository implements IConsultantsRepository {
  constructor(@inject(TYPES.ILogger) private loggerService: ILogger, @inject(TYPES.PrismaService) private prismaService: PrismaService) {}

  async leftEditRepository(id: number, dto: ConsultantsDto): Promise<ConsultantsLeftModel> {
    return await this.prismaService.client.consultantsLeftModel.update({
      where: { id: 1 },
      data: {
        name: dto.name,
        title: dto.title,
        photo: dto.photo,
      },
    });
  }

  async getLeftRepository(): Promise<ConsultantsLeftModel[]> {
    return this.prismaService.client.consultantsLeftModel.findMany();
  }

  async rightEditRepository(id: number, dto: ConsultantsDto): Promise<ConsultantsRightModel> {
    return await this.prismaService.client.consultantsRightModel.update({
      where: { id: 1 },
      data: {
        name: dto.name,
        title: dto.title,
        photo: dto.photo,
      },
    });
  }

  async getRightRepository(): Promise<ConsultantsRightModel[]> {
    return this.prismaService.client.consultantsRightModel.findMany();
  }
}
