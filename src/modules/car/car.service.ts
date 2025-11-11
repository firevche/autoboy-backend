import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import { IConfigService } from "../../config/config.service.interface";
import { HTTPError } from "../../errors/http-error.class";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ICarService } from "./car.service.interface";
import { ICarRepository } from "./car.repository.interface";
import { CarDto } from "./dto/car-edit.dto";
import { CarModel } from "@prisma/client";

@injectable()
export class CarService implements ICarService {
  constructor(@inject(TYPES.ConfigService) private configService: IConfigService, @inject(TYPES.CarRepository) private carRepository: ICarRepository) {}

  async createService(dto: CarDto): Promise<CarModel | null> {
    return this.carRepository.createRepository(dto);
  }

  async getService(): Promise<CarModel[]> {
    const reviews = await this.carRepository.getRepository();
    if (reviews.length === 0) {
      throw new HTTPError(404, "Авто не найдены");
    }
    return reviews;
  }

  async getIdService(id: number): Promise<CarModel | null> {
    const car = await this.carRepository.getIdRepository(id);
    if (!car) {
      throw new Error(`Авто с  ID ${id} не найдено`);
    }
    return car;
  }

  async deleteIdService(id: number): Promise<{ count: number }> {
    if (!id || id <= 0) {
      throw new Error("Некорректный айди");
    }
    try {
      return await this.carRepository.deleteIdRepository(id);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === "P2025") {
        throw new HTTPError(404, "Авто не найдет");
      }

      throw new HTTPError(500, "Неизвестная ошибка");
    }
  }

  async deleteAllService(): Promise<{ count: number }> {
    return await this.carRepository.deleteAllRepository();
  }

  async editService(dto: CarDto, id: number): Promise<CarModel | null> {
    return this.carRepository.editRepository(dto, id);
  }
}
