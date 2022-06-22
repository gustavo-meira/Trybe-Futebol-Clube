import CalculateTeamLeaderboard from '../helpers/CalculateTeamLeaderboard';
import ILeaderboardService, { LeaderboardType } from './ILeaderboardService';
import IMatchesService from './IMatchesService';
import ITeamsService from './ITeamsService';

class LeaderboardService implements ILeaderboardService {
  private matchesService: IMatchesService;
  private teamsService: ITeamsService;

  constructor(matchesService: IMatchesService, teamsService: ITeamsService) {
    this.matchesService = matchesService;
    this.teamsService = teamsService;
  }

  async getAll(): Promise<LeaderboardType[]> {
    const matches = await this.matchesService.getAll('false');
    const teams = await this.teamsService.getAll();
    const calculateTeamLeaderboard = new CalculateTeamLeaderboard();
    const teamsLeaderboard = teams.map((team) => (
      calculateTeamLeaderboard.calculateTeamScores(team.teamName, matches)
    ));
    return teamsLeaderboard.sort((a, b) => (
      b.totalPoints - a.totalPoints
      || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || b.goalsOwn - a.goalsOwn
    ));
  }
}

export default LeaderboardService;
