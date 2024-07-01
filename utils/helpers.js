import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);
import axios from "axios";

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

    return response.data;
  } catch (e) {
    console.error("error getting monster data:", e);
  }
};

// const readIndividualMonster = async (req, res, name) => {
//   console.log(name);
//   try {
//     const response = await axios.get(`www.dnd5eapi.co/api/monsters/${name}`);
//     console.log(response.data);
//     return response.data;
//   } catch (e) {
//     console.error("error getting monster data:", e);
//   }
// };

export { readMonsters, readFilteredMonsters };
