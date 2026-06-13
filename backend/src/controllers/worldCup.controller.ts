import { Request, Response, NextFunction } from "express";
import {
  getWorldCupGameDatesService,
  getWorldCupGamesByDateService,
  getWorldCupGamesFromDbService,
  getWorldCupMatchesService,
  getWorldCupTeamsService,
} from "../services/worldCupApi.service";
import { syncWorldCupMatchesService } from "../services/worldCupSync.service";

export async function getWorldCupMatches(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const data = await getWorldCupMatchesService();

    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
}

export async function syncWorldCupMatches(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const result = await syncWorldCupMatchesService();

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function getWorldCupGamesFromDb(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const games = await getWorldCupGamesFromDbService();

    return res.status(200).json(games);
  } catch (error) {
    next(error);
  }
}

export async function getWorldCupGamesByDate(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const date = String(req.params.date);

    const games = await getWorldCupGamesByDateService(date);

    return res.status(200).json(games);
  } catch (error) {
    next(error);
  }
}

export async function getWorldCupGameDates(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const dates = await getWorldCupGameDatesService();

    return res.status(200).json(dates);
  } catch (error) {
    next(error);
  }
}

export async function getWorldCupTeams(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const teams = await getWorldCupTeamsService();

    return res.status(200).json(teams);
  } catch (error) {
    next(error);
  }
}
