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
    console.error("Error reading from file ", error);
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

const readUsers = async (req, res) => {
  try {
    const usersList = await knex
      .from("users")
      .select(
        "users.id",
        "users.first_name",
        "users.last_name",
        "users.email",
        "users.phone",
        "users.address",
        "users.role"
      );

    return usersList;
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user data" });
    console.error(error);
  }
};

const readParty = async (req, res) => {
  try {
    const partyList = await knex
      .from("party")
      .select("party.id", "party.name", "party.level");

    return partyList;
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch party data" });
    console.error(error);
  }
};

const readPartyMembers = async (req, res) => {
  try {
    const partyMembersList = await knex
      .from("party_members")
      .select(
        "party_members.party_id",
        "party_members.name",
        "party_members.level"
      );

    return partyMembersList;
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch party member data" });
    console.error(error);
  }
};

const readMonsterSave = async (req, res) => {
  try {
    const monsterSaveList = await knex
      .from("monster_save")
      .select("monster_save.party_id", "monster_save.name", "monster_save.cr");

    return monsterSaveList;
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch monster save data" });
    console.error(error);
  }
};

export {
  readMonsters,
  readFilteredMonsters,
  readMonsterStats,
  readIndividualMonster,
  readIndividualMonsterImage,
  readUsers,
  readParty,
  readPartyMembers,
  readMonsterSave,
};
