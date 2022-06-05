type TeamType = {
  id: number,
  teamName: string,
};

interface ITeamsService {
  getAll(): Promise<TeamType[]>;
  getById(id: number): Promise<TeamType>;
}

export { TeamType };

export default ITeamsService;
