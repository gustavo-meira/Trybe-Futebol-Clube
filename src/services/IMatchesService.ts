import Match from '../database/models/match';

interface IMatchesService {
  getAll(inProgress: string | undefined): Promise<Match[]>;
}

export default IMatchesService;
