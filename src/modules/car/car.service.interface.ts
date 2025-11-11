import { CarModel } from "@prisma/client";
import { CarDto } from "./dto/car-edit.dto";

export interface ICarService {
  createService: (dto: CarDto) => Promise<CarModel | null>;
  getService: () => Promise<CarModel[]>;
  getIdService: (id: number) => Promise<CarModel | null>;
  deleteIdService: (id: number) => Promise<{ count: number }>;
  deleteAllService: () => Promise<{ count: number }>;
  editService: (dto: CarDto, id: number) => Promise<CarModel | null>;
}
