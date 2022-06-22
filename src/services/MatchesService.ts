import IMatchesService, { MatchType } from './IMatchesService';
import Match from '../database/models/match';
import Team from '../database/models/team';

class MatchesService implements IMatchesService {
  private matchRepository = Match;

  async getAll(inProgress?: string): Promise<MatchType[]> {
    const teamOptions = {
      include: [{ model: Team, as: 'teamHome', attributes: ['teamName'] },
        { model: Team, as: 'teamAway', attributes: ['teamName'] }],
      where: {},
    };

    if (inProgress === undefined) {
      const matches = await this.matchRepository.findAll(teamOptions) as unknown;
      return matches as MatchType[];
    }

    const inProgressBool = inProgress === 'true';

    teamOptions.where = { inProgress: inProgressBool };

    const matches = await this.matchRepository.findAll(teamOptions) as unknown;
    return matches as MatchType[];
  }

  async create(match: MatchType): Promise<Match> {
    return this.matchRepository.create(match);
  }

  async finish(id: number): Promise<string> {
    await this.matchRepository.update({ inProgress: false }, { where: { id } });
    return 'Finished';
  }

  async update(id: number, match: MatchType): Promise<string> {
    if (match === undefined) {
      await this.matchRepository.update({ inProgress: false }, { where: { id } });
    } else {
      await this.matchRepository.update(match, { where: { id } });
    }
    return 'Updated';
  }
}

export default MatchesService;
