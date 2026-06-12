import { Request, Response, NextFunction } from "express";
import {
  getTodayWorldCupGamesService,
  getWorldCupGamesByDateService,
  getWorldCupGamesFromDbService,
  getWorldCupMatchesService,
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

export async function getTodayWorldCupGames(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const games = await getTodayWorldCupGamesService();

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
