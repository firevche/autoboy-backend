import { NextFunction, Request, Response } from "express";
import { BaseController } from "../../common/base.controller";
import { HTTPError } from "../../errors/http-error.class";
import { UserRegisterDto } from "./dto/user-register.dto";
import { ValidateMiddleware } from "../../common/validate.middleware";
import { inject, injectable } from "inversify";
import { ILogger } from "../../log/logger.interface";
import { TYPES } from "../../types";
import "reflect-metadata";
import { IConfigService } from "../../config/config.service.interface";
import { IUserController } from "./user.controller.interface";
import { IUserService } from "./users.service.interface";
import { UserLoginDto } from "./dto/user-login.dto";
import { sign } from "jsonwebtoken";
import passport from "passport";
import { RoleMiddleware } from "../../common/role.middleware";

@injectable()
export class UserController extends BaseController implements IUserController {
  constructor(@inject(TYPES.ILogger) private loggerService: ILogger, @inject(TYPES.UserService) private userService: IUserService, @inject(TYPES.ConfigService) private configService: IConfigService) {
    super(loggerService);

    this.bindRoutes([
      { path: "/register", method: "post", func: this.register},
      { path: "/login", method: "post", func: this.login, middlewares: [new ValidateMiddleware(UserLoginDto)] },
      { path: "/getUsers", method: "get", func: this.getUsersService, middlewares: [passport.authenticate("jwt", { session: false }), RoleMiddleware(["ADMIN"])] },
      { path: "/getUser", method: "get", func: this.getUserService, middlewares: [passport.authenticate("jwt", { session: false }), RoleMiddleware(["ADMIN"])] },
      { path: "/delete", method: "delete", func: this.deleteAll, middlewares: [passport.authenticate("jwt", { session: false }), RoleMiddleware(["ADMIN"])] },
      { path: "/deleteEmail", method: "delete", func: this.deleteEmail, middlewares: [passport.authenticate("jwt", { session: false }), RoleMiddleware(["ADMIN"])] },
    ]);
  }

  async register(req: Request<{}, {}, UserRegisterDto>, res: Response, next: NextFunction) {
    const user = await this.userService.createUserService(req.body);
    if (!user) {
      return next(new HTTPError(400, "Такой юзер уже существует"));
    }
    this.ok(res, user);
  }

  async login(req: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction): Promise<void> {
    const result = await this.userService.validateUserService(req.body);
    if (!result) {
      return next(new HTTPError(401, "Authorization error"));
    }

    const user = await this.userService.getUserService(req.body.email);
    if (!user) {
      return next(new HTTPError(404, "User not found"));
    }
    const jwt = await this.signJWT(req.body.email, this.configService.get("SECRET"));
    res.cookie('token', jwt, {
      httpOnly: true,
      secure: true, 
      maxAge: 5 * 60 * 60 * 1000
    });
    this.ok(res, { jwt,role: user.role });
  }

  async deleteEmail(req: Request, res: Response, next: NextFunction) {
    const email = req.query.email as string;
    if (!email) {
      return next(new HTTPError(400, "Неправильный email"));
    }
    const result = await this.userService.deleteEmailService(email);
    if (!result) {
      return next(new HTTPError(404, "Не удалось удалить админа"));
    }
    this.ok(res, "Админ удалён");
  }

  async deleteAll(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.userService.deleteAllAdminsService();
      if (result.count === 0) {
        return next(new HTTPError(404, "Нечего удалять "));
      }
      this.ok(res, "Все админы удалены");
    } catch (error) {
      next(error);
    }
  }

  private signJWT(email: string, secret: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      sign(
        {
          email,
          iat: Math.floor(Date.now() / 1000),
        },
        secret,
        {
          algorithm: "HS256",
          expiresIn: "5h"
        },
        (err, token) => {
          if (err) {
            reject(err);
          }
          resolve(token as string);
        }
      );
    });
  }

  async getUsersService(req: Request, res: Response, next: NextFunction) {
    const result = await this.userService.getUsersService();
    if (!result) {
      return next(new HTTPError(400, "Error get users"));
    }
    this.ok(res, result);
  }

  async getUserService(req: Request, res: Response, next: NextFunction) {
    const email = req.query.email as string;
    if (!email) {
      return next(new HTTPError(400, "Email parameter is missing", "getUser"));
    }
    const result = await this.userService.getUserService(email);
    if (!result) {
      return next(new HTTPError(400, "Error get user"));
    }
    this.ok(res, result);
  }
}
