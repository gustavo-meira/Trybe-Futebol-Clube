import { NextFunction, Request, Response } from 'express';
import IMatchesService from '../services/IMatchesService';
import IMatchesController from './IMatchesController';

class MatchesController implements IMatchesController {
  constructor(private matchesService: IMatchesService) {}

  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { inProgress } = req.query;
      const matches = await this.matchesService.getAll(inProgress as string | undefined);
      res.status(200).json(matches);
    } catch (err) {
      next(err);
    }
  }
}

export default MatchesController;
