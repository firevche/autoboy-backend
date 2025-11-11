import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import { IConfigService } from "../../config/config.service.interface";
import { IConsultantsService } from "./consultants.service.interface";
import { IConsultantsRepository } from "./consultants.repository.interface";
import { ConsultantsDto } from "./dto/consultants-edit.dto";
import { ConsultantsLeftModel, ConsultantsRightModel } from "@prisma/client";
import { HTTPError } from "../../errors/http-error.class";

@injectable()
export class ConsultantsService implements IConsultantsService {
  constructor(@inject(TYPES.ConfigService) private configService: IConfigService, @inject(TYPES.ConsultantsRepository) private consultantsRepository: IConsultantsRepository) {}

  async leftEditService(id: number, dto: ConsultantsDto): Promise<ConsultantsLeftModel | null> {
    return this.consultantsRepository.leftEditRepository(id,dto);
  }
  async getLeftService(): Promise<ConsultantsLeftModel[]> {
    const reviews = await this.consultantsRepository.getLeftRepository();
    if (reviews.length === 0) {
      throw new HTTPError(404, "Консультанты не найдены");
    }
    return reviews;
  }

  async rightEditService(id: number, dto: ConsultantsDto): Promise<ConsultantsRightModel | null> {
    return this.consultantsRepository.rightEditRepository(id,dto);
  }
  async getRightService(): Promise<ConsultantsRightModel[]> {
    const reviews = await this.consultantsRepository.getRightRepository();
    if (reviews.length === 0) {
      throw new HTTPError(404, "Консультанты не найдены");
    }
    return reviews;
  }
}
