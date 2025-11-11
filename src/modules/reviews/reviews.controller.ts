import { NextFunction, Request, Response } from "express";
import { BaseController } from "../../common/base.controller";
import { inject, injectable } from "inversify";
import { ILogger } from "../../log/logger.interface";
import { TYPES } from "../../types";
import "reflect-metadata";
import { IConfigService } from "../../config/config.service.interface";
import passport from "passport";
import { RoleMiddleware } from "../../common/role.middleware";
import { IReviewsController } from "./reviews.controller.interface";
import { IReviewsService } from "./reviews.service.interface";
import { HTTPError } from "../../errors/http-error.class";
import { ReviewsDto } from "./dto/reviews-add.dto";

@injectable()
export class ReviewsController extends BaseController implements IReviewsController {
  constructor(@inject(TYPES.ILogger) private loggerService: ILogger, @inject(TYPES.ReviewsService) private reviewsService: IReviewsService, @inject(TYPES.ConfigService) private configService: IConfigService) {
    super(loggerService);

    this.bindRoutes([
      { path: "/add", method: "post", func: this.add, middlewares: [passport.authenticate("jwt", { session: false }), RoleMiddleware(["ADMIN"])] },
      { path: "/delete/:id", method: "delete", func: this.delete, middlewares: [passport.authenticate("jwt", { session: false }), RoleMiddleware(["ADMIN"])] },
      { path: "/get", method: "get", func: this.get },
    ]);
  }
  async add(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const dto: ReviewsDto = req.body;
      if (!dto.name || !dto.date || !dto.text) {
        res.status(400).json({ error: 'Пожалуйста, заполните все поля.' });
        return;
      }
      const result = await this.reviewsService.addService(dto);
      if (!result) {
        return next(new HTTPError(404, "Неизвестная Ошибка добавления отзыва"));
      }
      this.ok(res, "Отзыв добавлен!");
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const result = await this.reviewsService.deleteService(id);
      if (!result) {
        return next(new HTTPError(404, "Неизвестная ошибка. Не удалось удалить отзыв"));
      }
      this.ok(res, "Отзыв удален");
    } catch (error) {
      next(error);
    }
  }

  async get(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this.reviewsService.getService();
      if (!result) {
        return next(new HTTPError(404, "Не удалось получить отзывы"));
      }
      this.ok(res, result);
    } catch (error) {
      next(error);
    }
  }
}
