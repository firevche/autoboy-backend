import { ReviewsModel } from "@prisma/client";
import { ReviewsDto } from "./dto/reviews-add.dto";

export interface IReviewsRepository {
  addRepository: (dto: ReviewsDto) => Promise<ReviewsModel | null>;
  getRepository(): Promise<ReviewsModel[]>;
  deleteRepository: (id: number) => Promise<{ count: number }>;
}
