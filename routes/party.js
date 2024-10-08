import express from "express";

import initKnex from "knex";
import configuration from "../knexfile.js";

import {
  fetchParties,
  fetchAllPartyMembers,
  fetchIndividualParty,
  fetchPartyMembers,
  addOrUpdateParty,
} from "../controllers/controllers.js";

const knex = initKnex(configuration);

const router = express.Router();

router.get("/", fetchParties);
router.get("/allmembers", fetchAllPartyMembers);
router.post("/individual", fetchIndividualParty);
router.post("/members", fetchPartyMembers);
router.post("/addparty", addOrUpdateParty);

export default router;
