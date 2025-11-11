import { Container, ContainerModule, interfaces } from "inversify";
import { App } from "./app";
import { ConfigService } from "./config/config.service";
import { PrismaService } from "./database/prisma.service";
import { ExeptionFilter } from "./errors/exeption.filter";
import { LoggerService } from "./log/logger.service";
import { ILogger } from "./log/logger.interface";
import { TYPES } from "./types";
import { IExeptionFilter } from "./errors/exeption.filter.interface";
import { IConfigService } from "./config/config.service.interface";
import { UserController } from "./modules/users/users.controller";
import { IUserRepository } from "./modules/users/users.repository.interface";
import { UserRepository } from "./modules/users/users.repository";
import { IUserService } from "./modules/users/users.service.interface";
import { UserService } from "./modules/users/users.service";
import { IUserController } from "./modules/users/user.controller.interface";
import { PassportConfig } from "./config/passport-config";
import { IReviewsRepository } from "./modules/reviews/reviews.repository.interface";
import { ReviewsRepository } from "./modules/reviews/reviews.repository";
import { IReviewsService } from "./modules/reviews/reviews.service.interface";
import { ReviewsService } from "./modules/reviews/reviews.service";
import { ReviewsController } from "./modules/reviews/reviews.controller";
import { IReviewsController } from "./modules/reviews/reviews.controller.interface";
import { IConsultantsRepository } from "./modules/consultants/consultants.repository.interface";
import { IConsultantsService } from "./modules/consultants/consultants.service.interface";
import { IConsultantsController } from "./modules/consultants/consultants.controller.interface";
import { ConsultantsRepository } from "./modules/consultants/consultants.repository";
import { ConsultantsService } from "./modules/consultants/consultants.service";
import { ConsultantsController } from "./modules/consultants/consultants.controller";
import { ICarRepository } from "./modules/car/car.repository.interface";
import { ICarService } from "./modules/car/car.service.interface";
import { ICarController } from "./modules/car/car.controller.interface";
import { CarRepository } from "./modules/car/car.repository";
import { CarService } from "./modules/car/car.service";
import { CarController } from "./modules/car/car.controller";
import { ITelegramRepository } from "./modules/telegram/telegram.repository.interface";
import { ITelegramService } from "./modules/telegram/telegram.service.interface";
import { ITelegramController } from "./modules/telegram/telegram.controller.interface";
import { TelegramRepository } from "./modules/telegram/telegram.repository";
import { TelegramService } from "./modules/telegram/telegra.service";
import { TelegramController } from "./modules/telegram/telegram.controller";



export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
  bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
  bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter);
  bind<IUserRepository>(TYPES.UserRepository).to(UserRepository).inSingletonScope();
  bind<IUserService>(TYPES.UserService).to(UserService);
  bind<IUserController>(TYPES.UserController).to(UserController);
  bind<IReviewsRepository>(TYPES.ReviewsRepository).to(ReviewsRepository).inSingletonScope();
  bind<IReviewsService>(TYPES.ReviewsService).to(ReviewsService);
  bind<IReviewsController>(TYPES.ReviewsController).to(ReviewsController);
  bind<IConsultantsRepository>(TYPES.ConsultantsRepository).to(ConsultantsRepository).inSingletonScope();
  bind<IConsultantsService>(TYPES.ConsultantsService).to(ConsultantsService);
  bind<IConsultantsController>(TYPES.ConsultantsController).to(ConsultantsController);
  bind<ITelegramRepository>(TYPES.TelegramRepository).to(TelegramRepository).inSingletonScope();
  bind<ITelegramService>(TYPES.TelegramService).to(TelegramService);
  bind<ITelegramController>(TYPES.TelegramController).to(TelegramController);
  bind<ICarRepository>(TYPES.CarRepository).to(CarRepository).inSingletonScope();
  bind<ICarService>(TYPES.CarService).to(CarService);
  bind<ICarController>(TYPES.CarController).to(CarController);
  bind<PrismaService>(TYPES.PrismaService).to(PrismaService).inSingletonScope();
  bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
  bind<App>(TYPES.Application).to(App);
  bind<PassportConfig>(TYPES.PassportConfig).to(PassportConfig);
});

function bootstrap() {
  const appContainer = new Container();
  appContainer.load(appBindings);
  const app = appContainer.get<App>(TYPES.Application);
  app.init();
  return { appContainer, app };
}

export const { app, appContainer } = bootstrap();
