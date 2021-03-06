import { NextFunction, Request, Response } from 'express';

interface IMatchesController {
  getAll(req: Request, res: Response, next: NextFunction): Promise<void>;
  create(req: Request, res: Response, next: NextFunction): Promise<void>;
  finish(req: Request, res: Response, next: NextFunction): Promise<void>;
  update(req: Request, res: Response, next: NextFunction): Promise<void>;
}

export default IMatchesController;
