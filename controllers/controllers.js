import initKnex from "knex";
import configuration from "../knexfile.js";
import {
  readMonsters,
  readFilteredMonsters,
  readMonsterStats,
  readIndividualMonster,
  readIndividualMonsterImage,
  readUsers,
  readParty,
  readPartyMembers,
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
    // const monsterName = { name: monster.name };
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

const fetchUsers = async (_req, res) => {
  const userList = await readUsers();
  try {
    res.status(200).json(userList);
  } catch (err) {
    res.status(400).send(`Error retrieving users: ${err}`);
  }
};

const fetchIndividualUser = async (req, res) => {
  const userList = await readUsers();

  const selectedUser = userList.find((user) => {
    return user.id == req.body.id;
  });

  if (!selectedUser) {
    return res.status(404).json({ message: "User with this ID not found" });
  }

  res.status(200).json(selectedUser);
};

const editUser = async (req, res) => {
  const userIdCheck = await knex("users")
    .where({
      id: req.body.id,
    })
    .first();

  const userList = await readUsers();
  const selectedUser = userList.find((user) => {
    return user.id == req.body.id;
  });
  if (!userIdCheck) {
    return res.status(404).json({ message: "User with this ID not found" });
  } else if (!req.body.email) {
    res.status(400).json({
      message: "Email is required. Please enter email",
    });
  } else {
    const data = await knex("users")
      .where("users.id", "=", req.body.id)
      .update(req.body);
    res.status(200).json(data);
  }
};

const fetchParties = async (_req, res) => {
  const partyList = await readParty();
  try {
    res.status(200).json(partyList);
  } catch (err) {
    res.status(400).send(`Error retrieving party: ${err}`);
  }
};

const fetchIndividualParty = async (req, res) => {
  const partyList = await readParty();
  const selectedParty = partyList.find((party) => {
    return party.id == req.body.id;
  });

  if (!selectedParty) {
    return res.status(404).json({ message: "Party with this ID not found" });
  }

  res.status(200).json(selectedParty);
};

const fetchAllPartyMembers = async (_req, res) => {
  const partyMemberList = await readPartyMembers();
  try {
    res.status(200).json(partyMemberList);
  } catch (err) {
    res.status(400).send(`Error retrieving party members: ${err}`);
  }
};

const fetchPartyMembers = async (req, res) => {
  try {
    const partyMemberList = await readPartyMembers();

    const newPartyMemberList = partyMemberList.filter(
      (partyMember) => partyMember.party_id == req.body.id
    );

    if (newPartyMemberList.length === 0) {
      return res
        .status(404)
        .json({ message: "No Party Members with this Party ID not found" });
    }

    res.status(200).json(newPartyMemberList);
  } catch (error) {
    console.error("Error fetching party members:", error);
    res.status(500).json({ message: "Error fetching party members" });
  }
};

const addOrUpdateParty = async (req, res) => {
  try {
    const {
      user_id: user_id,
      id: party_id,
      name: partyName,
      level: partylevel,
      members: partyMembers,
    } = req.body;
    console.log(req.body);

    // Validate the input for the new party
    if (!user_id || !partyName || !partylevel) {
      return res
        .status(400)
        .json({ message: "Missing input values for the new party" });
    }

    // Validate each party member's information
    for (const member of partyMembers) {
      if (!member.name || !member.level) {
        return res.status(400).json({
          message: "Missing input values for one or more party members",
        });
      }
    }

    // Check if the party already exists by user ID
    const existingParty = await knex("party").where({ user_id }).first();

    let partyId;

    const newPartyInfo = {
      user_id,
      name: partyName,
      level: partylevel,
    };

    if (existingParty) {
      // Update the existing party information
      await knex("party").where({ id: existingParty.id }).update(newPartyInfo);
      partyId = existingParty.id;

      // Optionally, remove existing party members before inserting new ones
      await knex("party_members").where({ party_id: partyId }).del();
    } else {
      // Insert the new party information
      const result = await knex("party").insert(newPartyInfo);
      partyId = result[0]; // Retrieve the inserted ID (index 0 for single insert)
    }

    // Add the party ID to each party member
    const updatedPartyMembers = partyMembers.map((member) => ({
      ...member,
      party_id: partyId,
    }));

    // Insert party members into the 'party_members' table
    await knex("party_members").insert(updatedPartyMembers);

    // Return the party information
    res.status(200).json({ partyId, newPartyInfo, updatedPartyMembers });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message:
        "An error occurred while adding or updating the party and its members.",
    });
  }
};

export {
  fetchMonsters,
  fetchCRFilteredMonsters,
  fetchMonsterStats,
  fetchIndividualCRStats,
  fetchIndividualMonster,
  fetchIndividualMonsterImage,
  fetchUsers,
  fetchIndividualUser,
  editUser,
  fetchParties,
  fetchAllPartyMembers,
  fetchIndividualParty,
  fetchPartyMembers,
  addOrUpdateParty,
};
