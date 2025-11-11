import { NextFunction, Request, Response } from "express";

export interface ITelegramController {
  accept: (req: Request, res: Response, next: NextFunction) => void;
  main: (req: Request, res: Response, next: NextFunction) => void;
  experts: (req: Request, res: Response, next: NextFunction) => void;
  consultation: (req: Request, res: Response, next: NextFunction) => void;
  detailsCar: (req: Request, res: Response, next: NextFunction) => void;
  consultationCar: (req: Request, res: Response, next: NextFunction) => void;
}
