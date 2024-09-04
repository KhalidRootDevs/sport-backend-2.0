import { config } from 'dotenv';
config();

import { NextFunction, Request, Response } from 'express';
import { allSelectedLeagues } from '../../features/selectedLeagues/controller';

const baseUrl = process.env.SPORTMONKS_FOOTBALL_URL || '';
const authorizationToken = process.env.SPORTMONKS_API_TOKEN || '';

export async function fetchFootballData(endpoint: string) {
  const url = `${baseUrl}${endpoint}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': authorizationToken,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.statusText}`);
  }

  return response.json();
}

export async function monksFootballV3Data(req: Request, res: Response, next: NextFunction) {
  const removedPrefixUrl = req.originalUrl.replace('/football/v3', '');
  let urlEndpoint = removedPrefixUrl.split('?')[0];
  const urlQueryString = removedPrefixUrl.split('?')[1];
  const mainUrl = urlQueryString ? `${urlEndpoint}?${urlQueryString}` : urlEndpoint;

  try {
    if (urlEndpoint.includes('leagues')) {
      const data = await fetchFootballData(mainUrl);
      const selectedLeagues = await allSelectedLeagues();

      const filteredLeagues = selectedLeagues?.reduce((result: any[], selectedLeague: any) => {
        const matchingLeagues = data?.response?.filter(
          (league: any) => selectedLeague.id === league.league.id
        );
        return result.concat(matchingLeagues);
      }, []);

      const finalData = {
        ...data,
        response: filteredLeagues,
      };

      return res.json(finalData);
    }

    const data = await fetchFootballData(mainUrl);
    return res.json(data);
  } catch (error) {
    console.error(error);
    next(error);
  }
}
