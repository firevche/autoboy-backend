import { NextFunction, Request, Response } from "express";

export interface IUserController {
  register: (req: Request, res: Response, next: NextFunction) => void;
  login: (req: Request, res: Response, next: NextFunction) => void;
  deleteAll: (req: Request, res: Response, next: NextFunction) => void;
  deleteEmail: (req: Request, res: Response, next: NextFunction) => void;
  getUsersService: (req: Request, res: Response, next: NextFunction) => void;
  getUserService: (req: Request, res: Response, next: NextFunction) => void;
}
