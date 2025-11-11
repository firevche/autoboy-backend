import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import { IConfigService } from "../../config/config.service.interface";
import { HTTPError } from "../../errors/http-error.class";
import { ITelegramRepository } from "./telegram.repository.interface";
import { ITelegramService } from "./telegram.service.interface";

@injectable()
export class TelegramService implements ITelegramService {
  constructor(@inject(TYPES.ConfigService) private configService: IConfigService, @inject(TYPES.TelegramRepository) private telegramRepository: ITelegramRepository) {}

  async acceptService(data: any): Promise<{ success: boolean; message?: string }> {
    return await this.telegramRepository.acceptRepository(data);
  }

  async mainService(data: any): Promise<{ success: boolean; message?: string }> {
    return await this.telegramRepository.mainRepository(data);
  }
  async expertsService(data: any): Promise<{ success: boolean; message?: string }> {
    return await this.telegramRepository.expertsRepository(data);
  }
  async consultationService(data: any): Promise<{ success: boolean; message?: string }> {
    return await this.telegramRepository.consultationRepository(data);
  }
  async detailsCarService(data: any): Promise<{ success: boolean; message?: string }> {
    return await this.telegramRepository.detailsCarRepository(data);
  }
  async consultationCarService(data: any): Promise<{ success: boolean; message?: string }> {
    return await this.telegramRepository.consultationCarRepository(data);
  }

}
