import { NextFunction, Request, Response } from "express";

export interface IConsultantsController {
  leftEdit: (req: Request, res: Response, next: NextFunction) => void;
  getLeft: (req: Request, res: Response, next: NextFunction) => void;
  rightEdit: (req: Request, res: Response, next: NextFunction) => void;
  getRight: (req: Request, res: Response, next: NextFunction) => void;
}
