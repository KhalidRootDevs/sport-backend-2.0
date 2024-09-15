import { NextFunction, Request, Response } from 'express';
import SelectedLeagues from '../features/selectedLeagues/model';
import SelectedTeam from '../features/selectedTeams/model';
import SelectedPlayer from '../features/selectedPlayers/model';

export const handleRequest = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<void>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export const handleResponse = (status: number, message: string, data?: any) => ({
  status,
  message,
  data,
});

export const getSlugify = (inputString: string): string =>
  inputString
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');

export const getCategories = async function () {
  try {
    const filter = 'id name logo';

    // selectedLeagues
    let selectedLeagues: any = await SelectedLeagues.find({ status: true }).select(filter);
    selectedLeagues = selectedLeagues.map((league: any) => ({
      ...league.toObject(),
      type: 'leagues',
    }));

    // selectedTeams
    let selectedTeams: any = await SelectedTeam.find({ status: true }).select(filter);
    selectedTeams = selectedTeams.map((team: any) => ({ ...team.toObject(), type: 'teams' }));

    // selectedPlayers
    let selectedPlayers: any = await SelectedPlayer.find({ status: true }).select(filter);
    selectedPlayers = selectedPlayers.map((player: any) => ({
      ...player.toObject(),
      type: 'players',
    }));

    return [...selectedLeagues, ...selectedTeams, ...selectedPlayers];
  } catch (error) {
    console.error(error);
    return [];
  }
};
