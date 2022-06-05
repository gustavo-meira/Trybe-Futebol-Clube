type TeamType = {
  id: number,
  teamName: string,
};

interface ITeamsService {
  getAll(): Promise<TeamType[]>;
}

export { TeamType };

export default ITeamsService;
