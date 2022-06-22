import Match from '../database/models/match';

type MatchProps = {
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

type MatchType = {
  id: number,
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number,
  awayTeamGoals: number,
  inProgress: boolean,
  teamHome: {
    teamName: string,
  },
  teamAway: {
    teamName: string,
  },
};

interface IMatchesService {
  getAll(inProgress?: string): Promise<MatchType[]>;
  create(match: MatchProps): Promise<Match>;
  finish(id: number): Promise<string>;
  update(id: number, match?: MatchToUpdateType): Promise<string>;
}

export { MatchType, MatchProps };

export default IMatchesService;
