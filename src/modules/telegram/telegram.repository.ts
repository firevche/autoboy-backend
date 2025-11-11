import { inject, injectable } from "inversify";
import "reflect-metadata";
import { TYPES } from "../../types";
import { ILogger } from "../../log/logger.interface";
import { ITelegramRepository } from "./telegram.repository.interface";
import axios from "axios";
import { IConfigService } from "../../config/config.service.interface";

@injectable()
export class TelegramRepository implements ITelegramRepository {
  private telegramApiUrl: string;
  private chatId: string;

  constructor(
    @inject(TYPES.ILogger) private loggerService: ILogger,
    @inject(TYPES.ConfigService) private configService: IConfigService
  ) {
    this.telegramApiUrl = `https://api.telegram.org/bot${this.configService.get('TELEGRAM_BOT_TOKEN')}/sendMessage`;
    this.chatId = this.configService.get('TELEGRAM_CHAT_ID');
  }

  private formatMessage(data: any): string {
    const brand = this.getCarBrand(data.carBrand);
    const type = this.getCarType(data.carType);
    const budget = this.getBudget(data.budget);
    const contactMethod = this.getContactMethod(data.contactMethod);

    return `
      Новая заявка на подбор автомобиля:
      - Марка автомобиля: ${brand}
      - Тип кузова: ${type}
      - Бюджет: ${budget}
      - Способ связи: ${contactMethod}
      - Контактная информация: ${data.contactInfo}
    `;
  }

  private formatMainMessage(data: any): string {
    const contactMethod = this.getContactMethod(data.contactMethod);

    return `
      Новая заявка на скидку 5%:
      - Способ связи: ${contactMethod}
      - Контактная информация: ${data.contactInfo}
    `;
  }

  private formatExpertsMessage(data: any): string {
    const contactMethod = this.getContactMethod(data.contactMethod);

    return `
      Новая заявка на консультацию с экспертом:
      - Способ связи: ${contactMethod}
      - Контактная информация: ${data.contactInfo}
       - Специалист: ${data.specialistMethod}
    `;
  }

  private formatConsultationMessage(data: any): string {
    const contactMethod = this.getContactMethod(data.numberMethod);
  
    return `
      Новая заявка на получение консультации:
      - Имя: ${data.nameMethod}
      - Контактная информация: ${data.numberMethod}
      - Специалист: ${data.specialistMethod}
      - Удобное время: ${data.timeMethod}
    `;
  }

  private formatDetailsCarMessage(data: any): string {
    const contactMethod = this.getContactMethod(data.contactMethod);

    return `
      Новая заявка на получение детальной  инфо об авто:
      - Способ связи: ${contactMethod}
      - Контактная информация: ${data.contactInfo}
    `;
  }

  private formatConsultationCarMessage(data: any): string {
    const contactMethod = this.getContactMethod(data.contactMethod);

    return `
      Новая заявка на консультацию по авто:
      - Способ связи: ${contactMethod}
      - Контактная информация: ${data.contactInfo}
      - Автомобиль: ${data.carName}
    `;
  }

  private getCarBrand(carBrand: string): string {
    const carBrands: Record<string, string> = {
      "audi": "Audi",
      "bmw": "BMW",
      "mercedes": "Mercedes",
      "toyota": "Toyota",
      "honda": "Honda",
      "ford": "Ford",
      "chevrolet": "Chevrolet",
      "volkswagen": "Volkswagen",
      "nissan": "Nissan",
      "hyundai": "Hyundai",
      "kia": "Kia",
      "subaru": "Subaru",
      "mazda": "Mazda",
      "lexus": "Lexus",
      "jaguar": "Jaguar",
      "landrover": "Land Rover",
      "porsche": "Porsche",
      "tesla": "Tesla",
      "lada": "Lada",
      "other": "Другое"
    };
    return carBrands[carBrand] || carBrand;
  }

  private getCarType(carType: string): string {
    const carTypes: Record<string, string> = {
      "sedan": "Седан",
      "suv": "Внедорожник",
      "hatchback": "Хэтчбек",
      "coupe": "Купе",
      "convertible": "Кабриолет",
      "wagon": "Универсал",
      "pickup": "Пикап",
      "minivan": "Минивэн",
      "van": "Фургон",
      "truck": "Грузовик",
      "other": "Другое"
    };
    return carTypes[carType] || carType;
  }

  private getBudget(budget: string): string {
    const budgets: Record<string, string> = {
      "budget1": "до 1,000,000 руб.",
      "budget2": "1,000,000 - 2,000,000 руб.",
      "budget3": "более 2,000,000 руб."
    };
    return budgets[budget] || budget;
  }

  private getContactMethod(contactMethod: string): string {
    const contactMethods: Record<string, string> = {
      "telegram": "Telegram",
      "phone": "Телефон"
    };
    return contactMethods[contactMethod] || contactMethod;
  }

  async acceptRepository(data: any): Promise<{ success: boolean; message?: string }> {
    try {
      const message = this.formatMessage(data);
      await axios.post(this.telegramApiUrl, {
        chat_id: this.chatId,
        text: message,
      });
      return { success: true };
    } catch (error) {
      this.loggerService.error('Failed to send data to Telegram:', error);
      return { success: false, message: 'Failed to send data to Telegram' };
    }
  }

  async mainRepository(data: any): Promise<{ success: boolean; message?: string }> {
    try {
      const message = this.formatMainMessage(data);
      await axios.post(this.telegramApiUrl, {
        chat_id: this.chatId,
        text: message,
      });
      return { success: true };
    } catch (error) {
      this.loggerService.error('Failed to send data to Telegram:', error);
      return { success: false, message: 'Failed to send data to Telegram' };
    }
  }

  async expertsRepository(data: any): Promise<{ success: boolean; message?: string }> {
    try {
      const message = this.formatExpertsMessage(data);
      await axios.post(this.telegramApiUrl, {
        chat_id: this.chatId,
        text: message,
      });
      return { success: true };
    } catch (error) {
      this.loggerService.error('Failed to send data to Telegram:', error);
      return { success: false, message: 'Failed to send data to Telegram' };
    }
  }

  async consultationRepository(data: any): Promise<{ success: boolean; message?: string }> {
    try {
      const message = this.formatConsultationMessage(data);
      await axios.post(this.telegramApiUrl, {
        chat_id: this.chatId,
        text: message,
      });
      return { success: true };
    } catch (error) {
      this.loggerService.error('Failed to send data to Telegram:', error);
      return { success: false, message: 'Failed to send data to Telegram' };
    }
  }

  async detailsCarRepository(data: any): Promise<{ success: boolean; message?: string }> {
    try {
      const message = this.formatDetailsCarMessage(data);
      await axios.post(this.telegramApiUrl, {
        chat_id: this.chatId,
        text: message,
      });
      return { success: true };
    } catch (error) {
      this.loggerService.error('Failed to send data to Telegram:', error);
      return { success: false, message: 'Failed to send data to Telegram' };
    }
  }

  async consultationCarRepository(data: any): Promise<{ success: boolean; message?: string }> {
    try {
      const message = this.formatConsultationCarMessage(data);
      await axios.post(this.telegramApiUrl, {
        chat_id: this.chatId,
        text: message,
      });
      return { success: true };
    } catch (error) {
      this.loggerService.error('Failed to send data to Telegram:', error);
      return { success: false, message: 'Failed to send data to Telegram' };
    }
  }
}
