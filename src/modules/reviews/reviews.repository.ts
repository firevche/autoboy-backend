import { inject, injectable } from "inversify";
import "reflect-metadata";
import { TYPES } from "../../types";
import { ILogger } from "../../log/logger.interface";
import { PrismaService } from "../../database/prisma.service";
import { IReviewsRepository } from "./reviews.repository.interface";
import { ReviewsModel } from "@prisma/client";
import { ReviewsDto } from "./dto/reviews-add.dto";

@injectable()
export class ReviewsRepository implements IReviewsRepository {
  constructor(@inject(TYPES.ILogger) private loggerService: ILogger, @inject(TYPES.PrismaService) private prismaService: PrismaService) {}

  async addRepository(dto: ReviewsDto): Promise<ReviewsModel> {
    return this.prismaService.client.reviewsModel.create({
      data: {
        name: dto.name,
        date: dto.date,
        text: dto.text,
      },
    });
  }

  async deleteRepository(id: number): Promise<{ count: number }> {
    const result = await this.prismaService.client.reviewsModel.delete({
      where: {
        id,
      },
    });
    return { count: 1 };
  }

  async getRepository(): Promise<ReviewsModel[]> {
    return this.prismaService.client.reviewsModel.findMany();
  }
}
