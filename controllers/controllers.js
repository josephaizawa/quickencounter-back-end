import initKnex from "knex";
import configuration from "../knexfile.js";
import { readMonsters, readIndividualMonster } from "../utils/helpers.js";
const knex = initKnex(configuration);

const fetchMonsters = async (_req, res) => {
  const monsterList = await readMonsters();
  try {
    res.status(200).json(monsterList);
  } catch (err) {
    res.status(400).send(`Error retrieving monsters: ${err}`);
  }
};

const fetchIndividualMonster = async (req, res) => {
  const passedName = req.params;
  const selectedMonster = await readIndividualMonster(passedName);
  try {
    const response = await axios.get(
      `www.dnd5eapi.co/api/monsters/${passedName}`
    );
    console.log(response.data);
    return response.data;
  } catch (e) {
    console.error("error getting monster data:", e);
  }

  if (!selectedMonster) {
    return res
      .status(404)
      .json({ message: "Monster with this name not found" });
  }

  res.status(200).json(selectedMonster);
};

export { fetchMonsters, fetchIndividualMonster };
