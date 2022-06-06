import Match from '../database/models/match';

type MatchType = {
  homeTeam: number,
  homeTeamGoals: number,
  awayTeam: number,
  awayTeamGoals: number,
  inProgress: boolean,
};

type MatchToUpdateType = {
  homeTeamGoals: number,
  awayTeamGoals: number,
};

interface IMatchesService {
  getAll(inProgress?: string): Promise<Match[]>;
  create(match: MatchType): Promise<Match>;
  finish(id: number): Promise<string>;
  update(id: number, match?: MatchToUpdateType): Promise<string>;
}

export { MatchType };

export default IMatchesService;
