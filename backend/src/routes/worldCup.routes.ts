import { Router } from "express";
import {
  getWorldCupGameDates,
  getWorldCupGamesByDate,
  getWorldCupGamesFromDb,
  getWorldCupMatches,
  getWorldCupStandings,
  getWorldCupTeams,
  syncWorldCupMatches,
  syncWorldCupStandings,
} from "../controllers/worldCup.controller";

const router = Router();
router.get("/games/dates", getWorldCupGameDates);
router.get("/games/date/:date", getWorldCupGamesByDate);
router.get("/matches", getWorldCupMatches);
router.get("/teams", getWorldCupTeams);
router.get("/standings", getWorldCupStandings);
router.post("/sync", syncWorldCupMatches);
router.post("/sync/standings", syncWorldCupStandings);
router.get("/games", getWorldCupGamesFromDb);

export default router;
