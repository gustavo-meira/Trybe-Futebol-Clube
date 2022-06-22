import { NextFunction, Request, Response } from 'express';

interface ILeaderboardController {
  getAll(req: Request, res: Response, next: NextFunction): Promise<void>
}

export default ILeaderboardController;
