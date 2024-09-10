import { NextFunction, Request, Response } from 'express';
import { dbActions } from '../../db/dbActions';
import { querySchema } from '../../types';
import { handleResponse } from '../../utils/helper';
import { fetchFootballData } from '../../services/sportsApi/sportMonkV3';
import SelectedLeagues from '../selectedLeagues/model';

export const getFixtureMonks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { date } = req.body;

    if (!date) {
      return res.status(400).json(handleResponse(400, 'Date is required'));
    }

    let page = 50;

    const response = await fetchFootballData(
      `/fixtures/date/${encodeURIComponent(date)}?include=league.country;round.stage;participants;state;scores;periods&page=${page}`
    );

    // // Fetch selected leagues from the database
    // const selectedLeagues = await dbActions.readEvery(SelectedLeagues, {
    //   sort: { position: 1 },
    // });

    res.status(200).json(handleResponse(200, 'Formatted fixture list', response));
  } catch (error) {
    console.error('Error fetching fixtures:', error);
    next(error);
  }
};

export const searchLeagues = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const search_query = req.query.q as string;

    if (!search_query) {
      return res.status(400).json(handleResponse(400, 'Search query is required', null));
    }

    const { data } = await fetchFootballData(`/leagues/search/${encodeURIComponent(search_query)}`);

    res.status(200).json(handleResponse(200, 'League search results', data));
  } catch (error) {
    console.error(error);
    next(error);
  }
};
