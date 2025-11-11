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
import { ICarController } from "./car.controller.interface";
import { ICarService } from "./car.service.interface";
import { CarDto } from "./dto/car-edit.dto";
import upload from "../../config/upload";

@injectable()
export class CarController extends BaseController implements ICarController {
  constructor(@inject(TYPES.ILogger) private loggerService: ILogger, @inject(TYPES.CarService) private carService: ICarService, @inject(TYPES.ConfigService) private configService: IConfigService) {
    super(loggerService);

    this.bindRoutes([
      { path: "/", method: "post", func: this.create, middlewares: [passport.authenticate("jwt", { session: false }), upload.fields([
        { name: "photo1", maxCount: 1 },
        { name: "photo2", maxCount: 1 },
        { name: "photo3", maxCount: 1 },
        { name: "photo4", maxCount: 1 },
        { name: "photo5", maxCount: 1 },
      ]), RoleMiddleware(["ADMIN"])] },
      { path: "/get", method: "get", func: this.get },
      { path: "/get/:id", method: "get", func: this.getId },
      { path: "/deleteId/:id", method: "delete", func: this.deleteId, middlewares: [passport.authenticate("jwt", { session: false }), RoleMiddleware(["ADMIN"])] },
      { path: "/delete/", method: "delete", func: this.deleteAll, middlewares: [passport.authenticate("jwt", { session: false }), RoleMiddleware(["ADMIN"])] },
      { path: "/:id", method: "put", func: this.edit, middlewares: [passport.authenticate("jwt", { session: false }), RoleMiddleware(["ADMIN"])] },
    ]);
  }
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      const body = req.body;
      const dto: CarDto = {
        ...body,
        photo1: files.photo1 ? files.photo1[0].filename : undefined,
        photo2: files.photo2 ? files.photo2[0].filename : undefined,
        photo3: files.photo3 ? files.photo3[0].filename : undefined,
        photo4: files.photo4 ? files.photo4[0].filename : undefined,
        photo5: files.photo5 ? files.photo5[0].filename : undefined,
        equipment: body.equipment ? JSON.parse(body.equipment) : []
      };
      const result = await this.carService.createService(dto);
      if (!result) {
        return next(new HTTPError(404, "Неизвестная ошибка добавления автомобиля"));
      }
      this.ok(res, "Автомобиль добавлен!");
    } catch (error) {
      next(error);
    }
  }

  async get(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this.carService.getService();
      if (!result) {
        return next(new HTTPError(404, "Неизвестная ошибка. Не удалось получить авто"));
      }
      this.ok(res, result);
    } catch (error) {
      next(error);
    }
  }

  async getId(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const result = await this.carService.getIdService(id);
      if (!result) {
        return next(new HTTPError(404, "Неизвестная ошибка. Не удалось получить авто"));
      }
      this.ok(res, result);
    } catch (error) {
      next(error);
    }
  }

  async deleteId(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const result = await this.carService.deleteIdService(id);
      if (!result) {
        return next(new HTTPError(404, "Неизвестная ошибка. Не удалось удалить авто"));
      }
      this.ok(res, "Авто удален");
    } catch (error) {
      next(error);
    }
  }
  async deleteAll(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.carService.deleteAllService();
      if (result.count === 0) {
        return next(new HTTPError(404, "Нечего удалять "));
      }
      this.ok(res, "Все авто удалены");
    } catch (error) {
      next(error);
    }
  }

  async edit(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const body = req.body;
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      const dto: CarDto = {
        ...body,
        photo1: files['photo1'] ? files['photo1'][0].filename : undefined,
        photo2: files['photo2'] ? files['photo2'][0].filename : undefined,
        photo3: files['photo3'] ? files['photo3'][0].filename : undefined,
        photo4: files['photo4'] ? files['photo4'][0].filename : undefined,
        photo5: files['photo5'] ? files['photo5'][0].filename : undefined,
      };
      const result = await this.carService.editService(dto, id);
      if (!result) {
        return next(new HTTPError(404, "Неизвестная Ошибка изменения автомобиля"));
      }
      this.ok(res, "Автомобиль изменен!");
    } catch (error) {
      next(error);
    }
  }
}
