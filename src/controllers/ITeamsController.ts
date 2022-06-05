import { NextFunction, Request, Response } from 'express';

interface ITeamsController {
  getAll(req: Request, res: Response, next: NextFunction): Promise<void>;
  getById(req: Request, res: Response, next: NextFunction): Promise<void>;
}

export default ITeamsController;
