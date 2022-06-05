import { NextFunction, Request, Response } from 'express';
import ITeamsService from '../services/ITeamsService';
import ITeamsController from './ITeamsController';

class TeamsController implements ITeamsController {
  constructor(private teamsService: ITeamsService) {}

  async getAll(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const teams = await this.teamsService.getAll();
      res.status(200).json(teams);
    } catch (err) {
      next(err);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const team = await this.teamsService.getById(Number(req.params.id));
      res.status(200).json(team);
    } catch (err) {
      next(err);
    }
  }
}

export default TeamsController;
