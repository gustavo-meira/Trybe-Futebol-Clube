import { NextFunction, Request, Response, Router } from 'express';
import validateMatch from '../middlewares/ValidateMatch';
import MatchesController from '../controllers/MatchesController';
import MatchesService from '../services/MatchesService';
import validateToken from '../middlewares/validateToken';

const matchesRoutes = Router();

const matchesService = new MatchesService();
const matchesController = new MatchesController(matchesService);

matchesRoutes.get('/', (req: Request, res: Response, next: NextFunction) => {
  matchesController.getAll(req, res, next);
});

matchesRoutes.use(validateToken);

matchesRoutes.post(
  '/',
  validateMatch,
  (req: Request, res: Response, next: NextFunction) => {
    matchesController.create(req, res, next);
  },
);

export default matchesRoutes;
