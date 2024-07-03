import express from "express";
import initKnex from "knex";
import configuration from "../knexfile.js";
import {
  fetchMonsters,
  fetchCRFilteredMonsters,
  fetchMonsterStats,
  fetchIndividualCRStats,
} from "../controllers/controllers.js";
const knex = initKnex(configuration);
const router = express.Router();

router.get("/", fetchMonsters);
router.get("/stats", fetchMonsterStats);
router.post("/statsfiltered", fetchIndividualCRStats);
// router.get("/:passedName", fetchIndividualMonster);
router.post("/filtered", fetchCRFilteredMonsters);

export default router;
