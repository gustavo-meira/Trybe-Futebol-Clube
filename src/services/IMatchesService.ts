import Match from '../database/models/match';

type MatchType = {
  homeTeam: number,
  homeTeamGoals: number,
  awayTeam: number,
  awayTeamGoals: number,
  inProgress: boolean,
};

interface IMatchesService {
  getAll(inProgress: string | undefined): Promise<Match[]>;
  create(match: MatchType): Promise<Match>;
  finish(id: number): Promise<string>;
}

export { MatchType };

export default IMatchesService;
