import { MatchType } from '../services/IMatchesService';
import { LeaderboardType } from '../services/ILeaderboardService';

class CalculateTeamLeaderboard {
  private name: string;
  private totalPoints = 0;
  private totalGames = 0;
  private totalVictories = 0;
  private totalDraws = 0;
  private totalLosses = 0;
  private goalsFavor = 0;
  private goalsOwn = 0;

  private resetAllFields() {
    this.totalPoints = 0;
    this.totalGames = 0;
    this.totalVictories = 0;
    this.totalDraws = 0;
    this.totalLosses = 0;
    this.goalsFavor = 0;
    this.goalsOwn = 0;
  }

  private teamVictory() {
    this.totalVictories += 1;
    this.totalPoints += 3;
    this.totalGames += 1;
  }

  private teamLoss() {
    this.totalLosses += 1;
    this.totalGames += 1;
  }

  private teamDraw() {
    this.totalGames += 1;
    this.totalDraws += 1;
    this.totalPoints += 1;
  }

  private countMatchGoals(teamGoals: number, otherTeamGoals: number) {
    this.goalsFavor += teamGoals;
    this.goalsOwn += otherTeamGoals;

    if (teamGoals > otherTeamGoals) this.teamVictory();
    else if (teamGoals < otherTeamGoals) this.teamLoss();
    else if (teamGoals === otherTeamGoals) this.teamDraw();
  }

  private countGames(matches: MatchType[]) {
    matches.forEach((match) => {
      if (match.inProgress) return;
      if (match.teamHome.teamName === this.name) {
        this.countMatchGoals(match.homeTeamGoals, match.awayTeamGoals);
      }
      if (match.teamAway.teamName === this.name) {
        this.countMatchGoals(match.awayTeamGoals, match.homeTeamGoals);
      }
    });
  }

  public calculateTeamScores(teamName: string, allMatches: MatchType[]): LeaderboardType {
    this.name = teamName;
    this.resetAllFields();
    this.countGames(allMatches);

    return {
      name: this.name,
      totalPoints: this.totalPoints,
      totalGames: this.totalGames,
      totalVictories: this.totalVictories,
      totalDraws: this.totalDraws,
      totalLosses: this.totalLosses,
      goalsFavor: this.goalsFavor,
      goalsOwn: this.goalsOwn,
      goalsBalance: this.goalsFavor - this.goalsOwn,
      efficiency: Number(((this.totalPoints / (this.totalGames * 3)) * 100).toFixed(2)),
    };
  }
}

export default CalculateTeamLeaderboard;
