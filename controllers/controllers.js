import initKnex from "knex";
import configuration from "../knexfile.js";
import {
  readMonsters,
  readFilteredMonsters,
  readMonsterStats,
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
// const fetchIndividualCRStats = async (req, res) => {
//   const { cr } = req.body;

//   if (!cr) {
//     return res
//       .status(400)
//       .json({ message: "CR value missing in request body" });
//   }
//   const monsterStatsList = await readMonsterStats();
//   const selectedMonsterCR = monsterStatsList.find((monster) => {
//     console.log(monster.cr, cr);
//     return monster.cr == cr;
//   });

//   if (!selectedMonsterCR) {
//     return res.status(404).json({ message: "monster with this cr not found" });
//   }

//   res.status(200).json(selectedMonsterCR);
// };

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

export {
  fetchMonsters,
  fetchCRFilteredMonsters,
  fetchMonsterStats,
  fetchIndividualCRStats,
};
