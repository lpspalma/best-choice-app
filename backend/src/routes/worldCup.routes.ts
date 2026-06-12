import { Router } from "express";
import {
  getWorldCupMatches,
  syncWorldCupMatches,
} from "../controllers/worldCup.controller";

const router = Router();

router.get("/matches", getWorldCupMatches);
router.post("/sync", syncWorldCupMatches);

export default router;
