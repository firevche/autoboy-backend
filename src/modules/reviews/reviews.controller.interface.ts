import { NextFunction, Request, Response } from "express";

export interface IReviewsController {
  add: (req: Request, res: Response, next: NextFunction) => void;
  get: (req: Request, res: Response, next: NextFunction) => void;
  delete: (req: Request, res: Response, next: NextFunction) => void;
}
