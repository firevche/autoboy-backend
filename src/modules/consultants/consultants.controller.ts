import { NextFunction, Request, Response } from "express";
import { BaseController } from "../../common/base.controller";
import { inject, injectable } from "inversify";
import { ILogger } from "../../log/logger.interface";
import { TYPES } from "../../types";
import "reflect-metadata";
import { IConfigService } from "../../config/config.service.interface";
import passport from "passport";
import { RoleMiddleware } from "../../common/role.middleware";
import { HTTPError } from "../../errors/http-error.class";
import { IConsultantsController } from "./consultants.controller.interface";
import { IConsultantsService } from "./consultants.service.interface";
import { ConsultantsDto } from "./dto/consultants-edit.dto";
import upload from "../../config/upload";

@injectable()
export class ConsultantsController extends BaseController implements IConsultantsController {
  constructor(@inject(TYPES.ILogger) private loggerService: ILogger, @inject(TYPES.ConsultantsService) private consultantsService: IConsultantsService, @inject(TYPES.ConfigService) private configService: IConfigService) {
    super(loggerService);

    this.bindRoutes([
      { path: "/left/:id", method: "put", func: this.leftEdit, middlewares: [passport.authenticate("jwt", { session: false }), upload.single("photo"), RoleMiddleware(["ADMIN"])] },
      { path: "/getLeft", method: "get", func: this.getLeft },
      { path: "/right/:id", method: "put", func: this.rightEdit, middlewares: [passport.authenticate("jwt", { session: false }), upload.single("photo"), RoleMiddleware(["ADMIN"])] },
      { path: "/getRight", method: "get", func: this.getRight },
    ]);
  }
  async leftEdit(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params; 
      const { name, title } = req.body;
      const photo = req.file ? req.file.filename : undefined;

      const dto: ConsultantsDto = { name, title, photo };
      const result = await this.consultantsService.leftEditService(Number(id), dto);
      if (!result) {
        return next(new HTTPError(404, "Неизвестная Ошибка изменения левого консультанта"));
      }
      res.json({ message: "Консультант успешно изменен!", consultant: result });
    } catch (error) {
      next(error);
    }
  }

  async getLeft(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this.consultantsService.getLeftService();
      if (!result) {
        return next(new HTTPError(404, "Не удалось получить консультантов"));
      }
      this.ok(res, result);
    } catch (error) {
      next(error);
    }
  }
  async rightEdit(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params; 
      const { name, title } = req.body;
      const photo = req.file ? req.file.filename : undefined;

      const dto: ConsultantsDto = { name, title, photo };
      const result = await this.consultantsService.rightEditService(Number(id), dto);
      if (!result) {
        return next(new HTTPError(404, "Неизвестная Ошибка изменения правого консультанта"));
      }
      res.json({ message: "Консультант успешно изменен!", consultant: result });
    } catch (error) {
      next(error);
    }
  }

  async getRight(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this.consultantsService.getRightService();
      if (!result) {
        return next(new HTTPError(404, "Не удалось получить консультантов"));
      }
      this.ok(res, result);
    } catch (error) {
      next(error);
    }
  }
}
