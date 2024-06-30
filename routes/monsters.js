import express from "express";
import initKnex from "knex";
import configuration from "../knexfile.js";
import {
  fetchMonsters,
  fetchCRFilteredMonsters,
} from "../controllers/controllers.js";
const knex = initKnex(configuration);
const router = express.Router();

router.get("/", fetchMonsters);
// router.get("/:passedName", fetchIndividualMonster);
router.post("/filtered", fetchCRFilteredMonsters);

export default router;
