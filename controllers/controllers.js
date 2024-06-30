import initKnex from "knex";
import configuration from "../knexfile.js";
import { readMonsters, readFilteredMonsters } from "../utils/helpers.js";
const knex = initKnex(configuration);

const fetchMonsters = async (_req, res) => {
  const monsterList = await readMonsters();
  try {
    res.status(200).json(monsterList);
  } catch (err) {
    res.status(400).send(`Error retrieving monsters: ${err}`);
  }
};

// const fetchIndividualMonster = async (req, res) => {
//   const passedName = req.params;
//   try {
//     const response = await axios.get(
//       `www.dnd5eapi.co/api/monsters/${req.name}`
//     );
//     console.log(response.data);
//     return response.data;
//   } catch (e) {
//     console.error("error getting monster data:", e);
//   }

//   res.status(200).json(selectedMonster);
// };

const fetchCRFilteredMonsters = async (req, res) => {
  const { cr } = req.body;
  const filteredMonsterList = await readFilteredMonsters(cr);
  try {
    res.status(200).json(filteredMonsterList);
  } catch (err) {
    res.status(400).send(`Error retrieving monsters: ${err}`);
  }
};

export { fetchMonsters, fetchCRFilteredMonsters };
