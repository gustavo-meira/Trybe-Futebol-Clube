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

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { homeTeam, homeTeamGoals, awayTeam, awayTeamGoals, inProgress } = req.body;
      const match = await this.matchesService.create(
        { homeTeam, homeTeamGoals, awayTeam, awayTeamGoals, inProgress },
      );
      res.status(201).json(match);
    } catch (err) {
      next(err);
    }
  }
}

export default MatchesController;
