import IMatchesService, { MatchType } from './IMatchesService';
import Match from '../database/models/match';
import Team from '../database/models/team';

class MatchesService implements IMatchesService {
  private matchRepository = Match;

  async getAll(inProgress: string | undefined): Promise<Match[]> {
    const teamOptions = {
      include: [{ model: Team, as: 'teamHome', attributes: ['teamName'] },
        { model: Team, as: 'teamAway', attributes: ['teamName'] }],
      where: {},
    };

    if (inProgress === undefined) return this.matchRepository.findAll(teamOptions);

    const inProgressBool = inProgress === 'true';

    teamOptions.where = { inProgress: inProgressBool };

    return this.matchRepository.findAll(teamOptions);
  }

  async create(match: MatchType): Promise<Match> {
    return this.matchRepository.create(match);
  }
}

export default MatchesService;
