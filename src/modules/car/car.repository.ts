import { inject, injectable } from "inversify";
import "reflect-metadata";
import { TYPES } from "../../types";
import { ILogger } from "../../log/logger.interface";
import { PrismaService } from "../../database/prisma.service";
import { ICarRepository } from "./car.repository.interface";
import { CarDto } from "./dto/car-edit.dto";
import { CarModel } from "@prisma/client";

@injectable()
export class CarRepository implements ICarRepository {
  constructor(@inject(TYPES.ILogger) private loggerService: ILogger, @inject(TYPES.PrismaService) private prismaService: PrismaService) {}

  async createRepository(dto: CarDto): Promise<CarModel | null> {
    return this.prismaService.client.carModel.create({
      data: {
        photo1: dto.photo1 ?? "",
        photo2: dto.photo2 ?? "",
        photo3: dto.photo3 ?? "",
        photo4: dto.photo4 ?? "",
        photo5: dto.photo5 ?? "",
        name: dto.name ?? "",
        price: dto.price ?? "",
        seats: dto.seats ?? "",
        body: dto.body ?? "",
        fuel: dto.fuel ?? "",
        lot: dto.lot ?? "",
        mileage: dto.mileage ?? "",
        auction: dto.auction ?? "",
        year: dto.year ?? "",
        color: dto.color ?? "",
        engine: dto.engine ?? "",
        drive: dto.drive ?? "",
        transmission: dto.transmission ?? "",
        state: dto.state ?? "",
        owners: dto.owners ?? "",
        equipment: dto.equipment ?? [],
      },
    });
  }

  async getRepository(): Promise<CarModel[]> {
    return this.prismaService.client.carModel.findMany();
  }

  async getIdRepository(id: number): Promise<CarModel | null> {
    return this.prismaService.client.carModel.findUnique({
      where: {
        id: id,
      },
    });
  }

  async deleteIdRepository(id: number): Promise<{ count: number }> {
    const result = await this.prismaService.client.carModel.delete({
      where: {
        id,
      },
    });
    return { count: 1 };
  }

  async deleteAllRepository(): Promise<{ count: number }> {
    const result = await this.prismaService.client.carModel.deleteMany();
    return { count: result.count };
  }

  async editRepository(dto: CarDto, id: number): Promise<CarModel | null> {
    return this.prismaService.client.carModel.update({
      where: { id },
      data: {
        photo1: dto.photo1 ?? "",
        photo2: dto.photo2 ?? "",
        photo3: dto.photo3 ?? "",
        photo4: dto.photo4 ?? "",
        photo5: dto.photo5 ?? "",
        name: dto.name,
        price: dto.price,
        seats: dto.seats,
        body: dto.body,
        fuel: dto.fuel,
        lot: dto.lot,
        mileage: dto.mileage,
        auction: dto.auction,
        year: dto.year,
        color: dto.color,
        engine: dto.engine,
        drive: dto.drive,
        transmission: dto.transmission,
        state: dto.state,
        owners: dto.owners,
        equipment: dto.equipment,
      },
    });
  }
}
