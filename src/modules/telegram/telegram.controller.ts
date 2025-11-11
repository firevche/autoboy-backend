import { NextFunction, Request, Response } from "express";
import { BaseController } from "../../common/base.controller";
import { inject, injectable } from "inversify";
import { ILogger } from "../../log/logger.interface";
import { TYPES } from "../../types";
import "reflect-metadata";
import { IConfigService } from "../../config/config.service.interface";
import { HTTPError } from "../../errors/http-error.class";
import { ITelegramController } from "./telegram.controller.interface";
import { ITelegramService } from "./telegram.service.interface";

@injectable()
export class TelegramController extends BaseController implements ITelegramController {
  constructor(@inject(TYPES.ILogger) private loggerService: ILogger, @inject(TYPES.TelegramService) private telegramService: ITelegramService, @inject(TYPES.ConfigService) private configService: IConfigService) {
    super(loggerService);

    this.bindRoutes([
      { path: "/accept", method: "post", func: this.accept},
      { path: "/main", method: "post", func: this.main},
      { path: "/experts", method: "post", func: this.experts},
      { path: "/consultation", method: "post", func: this.consultation},
      { path: "/detailsCar", method: "post", func: this.detailsCar},
      { path: "/consultationCar", method: "post", func: this.consultationCar}
    ]);
  }
  async accept(req: Request, res: Response, next: NextFunction): Promise<void> {
      const result = await this.telegramService.acceptService(req.body);
      if (!result) {
        return next(new HTTPError(400, "Ошибка получения данныех в телеграмм бота"));
      }
      this.ok(res, result);
  }
  
  async main(req: Request, res: Response, next: NextFunction): Promise<void> {
      const result = await this.telegramService.mainService(req.body);
      if (!result) {
        return next(new HTTPError(400, "Ошибка получения данныех в телеграмм бота"));
      }
      this.ok(res, result);
  }
  async experts(req: Request, res: Response, next: NextFunction): Promise<void> {
    const result = await this.telegramService.expertsService(req.body);
    if (!result) {
      return next(new HTTPError(400, "Ошибка получения данныех в телеграмм бота"));
    }
    this.ok(res, result);
}

async consultation(req: Request, res: Response, next: NextFunction): Promise<void> {
  const result = await this.telegramService.consultationService(req.body);
  if (!result) {
    return next(new HTTPError(400, "Ошибка получения данныех в телеграмм бота"));
  }
  this.ok(res, result);
}

async detailsCar(req: Request, res: Response, next: NextFunction): Promise<void> {
  const result = await this.telegramService.detailsCarService(req.body);
  if (!result) {
    return next(new HTTPError(400, "Ошибка получения данныех в телеграмм бота"));
  }
  this.ok(res, result);
}


async consultationCar(req: Request, res: Response, next: NextFunction): Promise<void> {
  const result = await this.telegramService.consultationCarService(req.body);
  if (!result) {
    return next(new HTTPError(400, "Ошибка получения данныех в телеграмм бота"));
  }
  this.ok(res, result);
}

}