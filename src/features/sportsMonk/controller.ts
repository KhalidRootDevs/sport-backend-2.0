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

    let page: number = 1, hasMore: boolean = true, fixtures: any[] = [], groupByLeague: any = {};

    try {
      while (hasMore) {
        const response = await fetchFootballData(
          `/fixtures/date/${date}?include=league.country;round.stage;participants;state;scores;periods&${page}` // ?include=league.country;round.stage;participants;state;scores;periods&
        );
        // console.log(response)
        fixtures = [...fixtures, ...response?.data];
        hasMore = response?.data?.pagination?.has_more;
        page += 1;
      }
    } catch (err) {
      console.log(err);
    }
    console.log(fixtures);
    // Fetch selected leagues from the database
    const selectedLeagues = await dbActions.readEvery(SelectedLeagues, {
      sort: { position: 1 },
    });
    console.log(selectedLeagues)
    const filteredFixtures = selectedLeagues.reduce((result, selectedLeague) => {
      const matchingFixtures = fixtures?.filter((fixture) => selectedLeague.id === fixture.league.id);
      return result.concat(matchingFixtures);
    }, []);

    filteredFixtures.forEach((fixture: any) => {
      if (groupByLeague[fixture.league.id] !== undefined) {
        groupByLeague[fixture.league.id].push(fixture);
      } else {
        groupByLeague[fixture.league.id] = [];
        groupByLeague[fixture.league.id].push(fixture);
      }
    });

    const sortedKeys = Object.keys(groupByLeague).sort();

    const sortedObj: any = {};

    sortedKeys.forEach((key) => {
      sortedObj[key] = groupByLeague[key];
    });

    res.status(200).json(handleResponse(200, 'Formatted fixture list', sortedObj));
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
