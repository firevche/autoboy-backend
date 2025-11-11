import express, { Express } from "express";
import { Server } from "http";
import { UserController } from "./modules/users/users.controller";
import { PrismaService } from "./database/prisma.service";
import { inject, injectable } from "inversify";
import { TYPES } from "./types";
import { ILogger } from "./log/logger.interface";
import { IConfigService } from "./config/config.service.interface";
import "reflect-metadata";
import { IExeptionFilter } from "./errors/exeption.filter.interface";
import passport from "passport";
import { PassportConfig } from "./config/passport-config";
import { ReviewsController } from "./modules/reviews/reviews.controller";
import { ConsultantsController } from "./modules/consultants/consultants.controller";
import { CarController } from "./modules/car/car.controller";
import cors from "cors"; 
import { TelegramController } from "./modules/telegram/telegram.controller";
import cookieParser from "cookie-parser";

@injectable()
export class App {
  app: Express;
  server!: Server;
  port: number;

  constructor(
    @inject(TYPES.ILogger) private logger: ILogger,
    @inject(TYPES.UserController) private userController: UserController,
    @inject(TYPES.ReviewsController) private reviewsController: ReviewsController,
    @inject(TYPES.ConsultantsController) private consultantsController: ConsultantsController,
    @inject(TYPES.CarController) private carController: CarController,
    @inject(TYPES.TelegramController) private telegramController: TelegramController,
    @inject(TYPES.ExeptionFilter) private exeptionFilter: IExeptionFilter,
    @inject(TYPES.PrismaService) private prismaService: PrismaService,
    @inject(TYPES.ConfigService) private configService: IConfigService,
    @inject(TYPES.PassportConfig) private passportConfig: PassportConfig
  ) {
    this.app = express();
    this.app.use(express.json());

    // --- НАЧАЛО ИЗМЕНЕНИЙ ---
    // Мы создаем список разрешенных адресов
    const allowedOrigins = [
      'https://autoboy-frontend-production.up.railway.app', // Ваш фронтенд на Railway
      'https://autoboyclub.net', // Ваш основной домен
      'http://localhost:3000' // Для локальной разработки (стандартный порт React)
    ];

    this.app.use(cors({
      origin: function (origin, callback) {
        // Разрешаем запросы без origin (например, Postman или мобильные приложения)
        if (!origin) return callback(null, true);

        // Проверяем, есть ли origin в нашем списке разрешенных
        if (allowedOrigins.indexOf(origin) === -1) {
          const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
          return callback(new Error(msg), false);
        }
        return callback(null, true);
      },
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true 
    }));
    // --- КОНЕЦ ИЗМЕНЕНИЙ ---
    
    this.app.use(cookieParser());
    this.app.use('/var/www/project/backend/uploads', express.static('uploads'));
    this.passportConfig.initialize(passport);
    this.app.use(passport.initialize());
    this.port = 8000;
  }

  useRoutes() {
    this.app.use("/users", this.userController.router);
    this.app.use("/reviews", this.reviewsController.router);
    this.app.use("/consultants", this.consultantsController.router);
    this.app.use("/car", this.carController.router);
    this.app.use("/telegram", this.telegramController.router);
  }
  useExeptionFilter() {
    this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
  }

  public async init(): Promise<void> {
    this.useRoutes();
    this.useExeptionFilter();
    await this.prismaService.connect();
    this.server = this.app.listen(this.port);
    this.logger.log(`Сервер запущен на ${this.port}`);
  }
}
