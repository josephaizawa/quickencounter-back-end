import initKnex from "knex";
import configuration from "../knexfile.js";
import {
  readMonsters,
  readFilteredMonsters,
  readMonsterStats,
  readIndividualMonster,
  readIndividualMonsterImage,
} from "../utils/helpers.js";
const knex = initKnex(configuration);

const fetchMonsterStats = async (_req, res) => {
  const monsterStatsList = await readMonsterStats();
  try {
    res.status(200).json(monsterStatsList);
  } catch (err) {
    res.status(400).send(`Error retrieving monster stats: ${err}`);
  }
};

const fetchIndividualCRStats = async (req, res) => {
  const { cr } = req.body;

  if (!cr) {
    return res
      .status(400)
      .json({ message: "CR value missing in request body" });
  }

  try {
    const monsterStatsList = await readMonsterStats();

    const selectedMonsterCR = monsterStatsList.find((monster) => {
      return parseFloat(monster.cr) === parseFloat(cr);
    });

    if (!selectedMonsterCR) {
      return res
        .status(404)
        .json({ message: `Monster with CR ${cr} not found` });
    }

    res.status(200).json(selectedMonsterCR);
  } catch (error) {
    console.error("Error fetching individual CR stats:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const fetchMonsters = async (_req, res) => {
  const monsterList = await readMonsters();
  try {
    res.status(200).json(monsterList);
  } catch (err) {
    res.status(400).send(`Error retrieving monsters: ${err}`);
  }
};

const fetchIndividualMonster = async (req, res) => {
  const name = req.body.name;

  const responses = await Promise.all([
    readIndividualMonster(name),
    readIndividualMonsterImage(name),
  ]);

  const monsterDetails = await responses[0];
  const monsterImage = await responses[1];

  const updatedMonsterDetails = {
    ...monsterDetails,
    image: { monsterImage },
  };

  try {
    res.status(200).json(updatedMonsterDetails);
  } catch (err) {
    res.status(400).send(`Error retrieving monsters: ${err}`);
  }
};

const fetchIndividualMonsterImage = async (req, res) => {
  const { name } = req.body;
  const individualMonsterImage = await readIndividualMonsterImage(name);
  try {
    res.status(200).json(individualMonsterImage);
  } catch (err) {
    res.status(400).send(`Error retrieving monsters: ${err}`);
  }
};

const fetchCRFilteredMonsters = async (req, res) => {
  const { cr } = req.body;
  const filteredMonsterList = await readFilteredMonsters(cr);

  const requests = filteredMonsterList.map(async (monster) => {
    const monsterName = { name: monster.name };
    const monsterImage = await readIndividualMonsterImage(monster.name);

    const updatedMonsterDetails = {
      ...monster,
      image: { monsterImage },
    };

    return updatedMonsterDetails;
  });
  const detailedMonsters = await Promise.all(requests);

  try {
    res.status(200).json(detailedMonsters);
  } catch (err) {
    res.status(400).send(`Error retrieving monsters: ${err}`);
  }
};

export {
  fetchMonsters,
  fetchCRFilteredMonsters,
  fetchMonsterStats,
  fetchIndividualCRStats,
  fetchIndividualMonster,
  fetchIndividualMonsterImage,
};
