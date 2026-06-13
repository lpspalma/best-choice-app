import { Router } from "express";
import {
  getWorldCupGameDates,
  getWorldCupGamesByDate,
  getWorldCupGamesFromDb,
  getWorldCupMatches,
  getWorldCupTeams,
  syncWorldCupMatches,
} from "../controllers/worldCup.controller";

const router = Router();
router.get("/games/dates", getWorldCupGameDates);
router.get("/games/date/:date", getWorldCupGamesByDate);
router.get("/matches", getWorldCupMatches);
router.get("/teams", getWorldCupTeams);
router.post("/sync", syncWorldCupMatches);
router.get("/games", getWorldCupGamesFromDb);

export default router;
