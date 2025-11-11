import { IsString } from "class-validator";

export class ReviewsDto {
  @IsString({ message: "Incorrect name" })
  name: string;

  @IsString({ message: "Incorrect review" })
  text: string;

  date: string;
}
