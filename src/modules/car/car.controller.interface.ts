import { NextFunction, Request, Response } from "express";

export interface ICarController {
  create: (req: Request, res: Response, next: NextFunction) => void;
  get: (req: Request, res: Response, next: NextFunction) => void;
  getId: (req: Request, res: Response, next: NextFunction) => void;
  deleteId: (req: Request, res: Response, next: NextFunction) => void;
  deleteAll: (req: Request, res: Response, next: NextFunction) => void;
  edit: (req: Request, res: Response, next: NextFunction) => void;
}
