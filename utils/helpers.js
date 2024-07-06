import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);
import axios from "axios";

const readMonsterStats = async (_req, res) => {
  try {
    const data = await knex
      .from("monsterstatsbycr1")
      .select(
        "cr",
        "proficiency_bonus",
        "ac",
        "min_hp",
        "max_hp",
        "average_hp",
        "attack_bonus",
        "min_dpr",
        "max_dpr",
        "average_dpr",
        "save_dc",
        "hp_increase",
        "hp_decrease",
        "idx"
      );
    return data;
  } catch (error) {
    console.log("Error reading from file ", error);
  }
};

const readMonsters = async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.open5e.com/monsters?document__slug=wotc-srd`
    );

    return response.data;
  } catch (e) {
    console.error("error getting monster data:", e);
  }
};

const readFilteredMonsters = async (cr) => {
  try {
    const response = await axios.get(
      `https://api.open5e.com/monsters?document__slug=wotc-srd&cr=${cr}`
    );

    return response.data.results;
  } catch (e) {
    console.error("error getting monster data:", e);
  }
};

const readIndividualMonster = async (name) => {
  try {
    const response = await axios.get(
      `https://www.dnd5eapi.co/api/monsters/${name
        .replace(/ /g, "-")
        .toLowerCase()}`
    );

    return response.data;
  } catch (e) {
    console.error("error getting monster data:", e);
  }
};
const readIndividualMonsterImage = async (name) => {
  try {
    const response = await axios.get(
      `https://api.magicthegathering.io/v1/cards?name=${name.toLowerCase()}`
    );
    let monsterImage = response.data.cards[0].imageUrl;

    return monsterImage;
  } catch (e) {
    console.error("error getting monster data:", e);
  }
};

export {
  readMonsters,
  readFilteredMonsters,
  readMonsterStats,
  readIndividualMonster,
  readIndividualMonsterImage,
};
