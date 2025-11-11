import { IsOptional, IsString } from "class-validator";

export class ConsultantsDto {
  @IsOptional()
  @IsString({ message: "Incorrect name" })
  name?: string;

  @IsOptional()
  @IsString({ message: "Incorrect title" })
  title?: string;

  @IsOptional()
  photo?: string;
}
