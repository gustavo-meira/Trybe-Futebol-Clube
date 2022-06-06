import { NextFunction, Request, Response } from 'express';
import TeamsService from '../services/TeamsService';
import UnauthorizedError from '../errors/UnauthorizedError';

const validateNotEqualTeams = (team1: number, team2: number) => {
  if (team1 === team2) {
    throw new UnauthorizedError('It is not possible to create a match with two equal teams');
  }
};

const validateTeamsExist = async (team1: number, team2: number) => {
  const teamsService = new TeamsService();
  await teamsService.getById(team1);
  await teamsService.getById(team2);
};

const validateMatch = async (req: Request, _res: Response, next: NextFunction) => {
  try {
    const { homeTeam, awayTeam } = req.body;
    validateNotEqualTeams(homeTeam, awayTeam);
    await validateTeamsExist(homeTeam, awayTeam);
    next();
  } catch (err) {
    next(err);
  }
};

export default validateMatch;
