import { Router } from 'express';
import TeamsService from '../services/TeamsService';
import MatchesService from '../services/MatchesService';
import LeaderboardService from '../services/LeaderboardService';
import LeaderboardController from '../controllers/LeaderboardController';

const leaderboardRoutes = Router();

const matchesService = new MatchesService();
const teamsService = new TeamsService();
const leaderboardService = new LeaderboardService(matchesService, teamsService);
const leaderboardController = new LeaderboardController(leaderboardService);

leaderboardRoutes.get('/', (req, res, next) => {
  leaderboardController.getAll(req, res, next);
});

export default leaderboardRoutes;
