import { Response, Router } from "express";
import { LoggerService } from "../log/logger.service";
import { IControllerRoute } from "./route.interface";
import { injectable } from "inversify";
export { Router } from "express";
import "reflect-metadata";

@injectable()
export abstract class BaseController {
  private readonly _router: Router;

  constructor(private logger: LoggerService) {
    this._router = Router();
  }

  get router() {
    return this._router;
  }

  public send<T>(res: Response, code: number, message: T) {
    res.type("application/json");
    return res.status(200).json(message);
  }

  public ok<T>(res: Response, message: T) {
    return this.send<T>(res, 200, message);
  }

  public created(res: Response) {
    return res.sendStatus(201);
  }

  protected bindRoutes(routes: IControllerRoute[]): void {
    for (const route of routes) {
      const middleware = route.middlewares ? route.middlewares.map((m) => (typeof m === "function" ? m : m.execute.bind(m))) : [];
      const handler = route.func.bind(this);
      this.router[route.method](route.path, ...middleware, handler);
    }
  }
}
