import NotFoundError from '../errors/NotFoundError';
import Team from '../database/models/team';
import ITeamsService from './ITeamsService';

class TeamsService implements ITeamsService {
  private teamRepository = Team;

  async getAll(): Promise<Team[]> {
    return this.teamRepository.findAll();
  }

  async getById(id: number): Promise<Team> {
    const team = await this.teamRepository.findOne({ where: { id } });
    if (!team) {
      throw new NotFoundError('Team not found');
    }
    return team;
  }
}

export default TeamsService;
