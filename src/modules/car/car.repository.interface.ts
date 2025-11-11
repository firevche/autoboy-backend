import { CarModel } from "@prisma/client";
import { CarDto } from "./dto/car-edit.dto";

export interface ICarRepository {
  createRepository: (dto: CarDto) => Promise<CarModel | null>;
  getRepository: () => Promise<CarModel[]>;
  getIdRepository: (id: number) => Promise<CarModel | null>;
  deleteIdRepository: (id: number) => Promise<{ count: number }>;
  deleteAllRepository: () => Promise<{ count: number }>;
  editRepository: (dto: CarDto, id: number) => Promise<CarModel | null>;
}
