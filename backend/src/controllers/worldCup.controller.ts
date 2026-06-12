import { Request, Response, NextFunction } from "express";
import { getWorldCupMatchesService } from "../services/worldCupApi.service";
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
