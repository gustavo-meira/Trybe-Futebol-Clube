import { NextFunction, Request, Response } from 'express';
import ILeaderboardService from '../services/ILeaderboardService';
import ILeaderboardController from './ILeaderboardController';

class LeaderboardController implements ILeaderboardController {
  private leaderboardService: ILeaderboardService;

  constructor(leaderboardService: ILeaderboardService) {
    this.leaderboardService = leaderboardService;
  }

  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const leaderboard = await this.leaderboardService.getAll();
      res.status(200).json(leaderboard);
    } catch (err) {
      next(err);
    }
  }
}

export default LeaderboardController;
