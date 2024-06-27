import express from "express";
import initKnex from "knex";
import configuration from "../knexfile.js";
import {
  fetchMonsters,
  fetchIndividualMonster,
} from "../controllers/controllers.js";
const knex = initKnex(configuration);
const router = express.Router();

router.get("/", fetchMonsters);
router.get("/:passedName", fetchIndividualMonster);

export default router;
