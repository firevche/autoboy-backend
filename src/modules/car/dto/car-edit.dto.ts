import { IsArray, IsOptional, IsString } from "class-validator";

export class CarDto {
  @IsOptional()
  @IsString({ message: "Incorrect photo" })
  photo1?: string;

  @IsOptional()
  @IsString({ message: "Incorrect photo 2" })
  photo2?: string;

  @IsOptional()
  @IsString({ message: "Incorrect photo 3" })
  photo3?: string;

  @IsOptional()
  @IsString({ message: "Incorrect photo 4" })
  photo4?: string;

  @IsOptional()
  @IsString({ message: "Incorrect photo 5" })
  photo5?: string;

  @IsOptional()
  @IsString({ message: "Incorrect name" })
  name?: string;

  @IsOptional()
  @IsString({ message: "Incorrect price" })
  price?: string;

  @IsOptional()
  @IsString({ message: "Incorrect seats" })
  seats?: string;

  @IsOptional()
  @IsString({ message: "Incorrect body" })
  body?: string;

  @IsOptional()
  @IsString({ message: "Incorrect fuel" })
  fuel?: string;

  @IsOptional()
  @IsString({ message: "Incorrect lot" })
  lot?: string;

  @IsOptional()
  @IsString({ message: "Incorrect mileage" })
  mileage?: string;

  @IsOptional()
  @IsString({ message: "Incorrect auction" })
  auction?: string;

  @IsOptional()
  @IsString({ message: "Incorrect year" })
  year?: string;

  @IsOptional()
  @IsString({ message: "Incorrect color" })
  color?: string;

  @IsOptional()
  @IsString({ message: "Incorrect engine" })
  engine?: string;

  @IsOptional()
  @IsString({ message: "Incorrect drive" })
  drive?: string;

  @IsOptional()
  @IsString({ message: "Incorrect transmission" })
  transmission?: string;

  @IsOptional()
  @IsString({ message: "Incorrect state" })
  state?: string;

  @IsOptional()
  @IsString({ message: "Incorrect owners" })
  owners?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  equipment?: string[];
}
