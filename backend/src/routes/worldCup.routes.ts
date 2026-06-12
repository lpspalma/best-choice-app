import { Router } from "express";
import {
  getTodayWorldCupGames,
  getWorldCupGamesByDate,
  getWorldCupGamesFromDb,
  getWorldCupMatches,
  syncWorldCupMatches,
} from "../controllers/worldCup.controller";

const router = Router();
router.get("/games/today", getTodayWorldCupGames);
router.get("/games/date/:date", getWorldCupGamesByDate);
router.get("/matches", getWorldCupMatches);
router.post("/sync", syncWorldCupMatches);
router.get("/games", getWorldCupGamesFromDb);

export default router;
