import { ReviewsModel } from "@prisma/client";
import { ReviewsDto } from "./dto/reviews-add.dto";

export interface IReviewsService {
  addService: (dto: ReviewsDto) => Promise<ReviewsModel | null>;
  getService(): Promise<ReviewsModel[]>;
  deleteService: (id: number) => Promise<{ count: number }>;
}
