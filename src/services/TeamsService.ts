import Team from '../database/models/team';
import ITeamsService from './ITeamsService';

class TeamsService implements ITeamsService {
  private teamRepository = Team;

  async getAll(): Promise<Team[]> {
    return this.teamRepository.findAll();
  }
}

export default TeamsService;
