import { NextFunction, Request, Response } from 'express';

interface IMatchesController {
  getAll(req: Request, res: Response, next: NextFunction): Promise<void>;
  create(req: Request, res: Response, next: NextFunction): Promise<void>;
}

export default IMatchesController;
