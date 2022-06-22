type LeaderboardType = {
  name: string,
  totalPoints: number;
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: number
};

interface ILeaderboardService {
  getAll(): Promise<LeaderboardType[]>
}

export { LeaderboardType };

export default ILeaderboardService;
