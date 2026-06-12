import { Router } from "express";
import {
  getWorldCupGamesFromDb,
  getWorldCupMatches,
  syncWorldCupMatches,
} from "../controllers/worldCup.controller";

const router = Router();

router.get("/matches", getWorldCupMatches);
router.post("/sync", syncWorldCupMatches);
router.get("/games", getWorldCupGamesFromDb);

export default router;
