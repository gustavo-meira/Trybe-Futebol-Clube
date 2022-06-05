import { NextFunction, Request, Response, Router } from 'express';
import MatchesController from '../controllers/MatchesController';
import MatchesService from '../services/MatchesService';

const matchesRoutes = Router();

const matchesService = new MatchesService();
const matchesController = new MatchesController(matchesService);

matchesRoutes.get('/', (req: Request, res: Response, next: NextFunction) => {
  matchesController.getAll(req, res, next);
});

export default matchesRoutes;
