import express from "express";
import initKnex from "knex";
import configuration from "../knexfile.js";
import {
  fetchMonsters,
  fetchCRFilteredMonsters,
  fetchMonsterStats,
  fetchIndividualCRStats,
  fetchIndividualMonster,
  fetchIndividualMonsterImage,
  saveMonsters,
  fetchSavedMonsters,
} from "../controllers/controllers.js";
const knex = initKnex(configuration);
const router = express.Router();

router.get("/", fetchMonsters);
router.get("/stats", fetchMonsterStats);
router.post("/statsfiltered", fetchIndividualCRStats);
router.post("/individual", fetchIndividualMonster);
router.post("/image", fetchIndividualMonsterImage);
router.post("/filtered", fetchCRFilteredMonsters);
router.post("/save", saveMonsters);
router.post("/savedmonsters", fetchSavedMonsters);

export default router;
