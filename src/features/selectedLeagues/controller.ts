import { NextFunction, Request, Response } from 'express';
import { dbActions } from '../../db/dbActions';
import { querySchema } from '../../types';
import { handleResponse } from '../../utils/helper';
import SelectedLeagues from './model';
import { selectedLeaguesSchema } from './validator';

// Get all selected leagues
export const allSelectedLeagues = async () => {
  try {
    const selectedLeagues = await dbActions.readEvery(SelectedLeagues, {
      sort: { position: 1 },
    });
    return selectedLeagues || [];
  } catch (error) {
    console.error(error);
  }
};

// Create a new selected league
export const createSelectedLeague = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const selectedLeagueData = selectedLeaguesSchema.parse(req.body);

    const selectedLeague = await dbActions.create(SelectedLeagues, selectedLeagueData);
    res
      .status(201)
      .json(handleResponse(201, 'Selected league created successfully', selectedLeague));
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// Get all selected leagues
export const getAllSelectedLeagues = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page, limit, search } = querySchema.parse(req.query);

    const query: any = {};

    if (search) {
      query.email = new RegExp(search, 'i');
    }

    const selectedLeagues = await dbActions.readAll(SelectedLeagues, {
      query,
      sort: { createdAt: -1 },
      pagination: { page, limit },
    });

    res
      .status(200)
      .json(handleResponse(200, 'Selected leagues fetched successfully', selectedLeagues));
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// Get a single selected league by ID
export const getSelectedLeagueById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const selectedLeague = await dbActions.read(SelectedLeagues, {
      query: { _id: req.params.id },
    });
    if (!selectedLeague) {
      return res.status(404).json(handleResponse(404, 'Selected league not found'));
    }
    res
      .status(200)
      .json(handleResponse(200, 'Selected league fetched successfully', selectedLeague));
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// Update a selected league by ID
export const updateSelectedLeague = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const selectedLeagueData = selectedLeaguesSchema.parse(req.body);

    const updatedSelectedLeague = await dbActions.update(SelectedLeagues, {
      query: { _id: req.params.id },
      update: selectedLeagueData,
    });
    if (!updatedSelectedLeague) {
      return res.status(404).json(handleResponse(404, 'Selected league not found'));
    }
    res
      .status(200)
      .json(handleResponse(200, 'Selected league updated successfully', updatedSelectedLeague));
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// Delete a selected league by ID
export const deleteSelectedLeague = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deletedSelectedLeague = await dbActions.delete(SelectedLeagues, {
      query: { _id: req.params.id },
    });
    if (!deletedSelectedLeague) {
      return res.status(404).json(handleResponse(404, 'Selected league not found'));
    }
    res.status(200).json(handleResponse(200, 'Selected league deleted successfully'));
  } catch (error) {
    console.error(error);
    next(error);
  }
};
