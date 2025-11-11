import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import { IConfigService } from "../../config/config.service.interface";
import { IReviewsService } from "./reviews.service.interface";
import { IReviewsRepository } from "./reviews.repository.interface";
import { ReviewsDto } from "./dto/reviews-add.dto";
import { ReviewsModel } from "@prisma/client";
import { HTTPError } from "../../errors/http-error.class";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

@injectable()
export class ReviewsService implements IReviewsService {
  constructor(@inject(TYPES.ConfigService) private configService: IConfigService, @inject(TYPES.ReviewsRepository) private reviewsRepository: IReviewsRepository) {}

  async addService(dto: ReviewsDto): Promise<ReviewsModel | null> {
    return this.reviewsRepository.addRepository(dto);
  }
  async getService(): Promise<ReviewsModel[]> {
    const reviews = await this.reviewsRepository.getRepository();
    if (reviews.length === 0) {
      throw new HTTPError(404, "Отзывы не найдены");
    }
    return reviews;
  }

  async deleteService(id: number): Promise<{ count: number }> {
    if (!id || id <= 0) {
      throw new Error("Некорректный айди");
    }
    try {
      return await this.reviewsRepository.deleteRepository(id);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === "P2025") {
        throw new HTTPError(404, "Отзыв не найдет");
      }

      throw new HTTPError(500, "Неизвестная ошибка");
    }
  }
}
