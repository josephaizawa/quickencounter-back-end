import express from "express";
import bcrypt from "bcrypt";
import initKnex from "knex";
import configuration from "../knexfile.js";
import jwt from "jsonwebtoken";
import {
  editUser,
  fetchIndividualUser,
  fetchUsers,
} from "../controllers/controllers.js";

const knex = initKnex(configuration);

const router = express.Router();

router.get("/", fetchUsers);
router.post("/individual", fetchIndividualUser);
router.put("/edituser", editUser);

// register
router.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Please enter the required fields.");
  }

  const hashedPassword = bcrypt.hashSync(password, 6);

  const newUser = {
    email,
    password: hashedPassword,
  };

  try {
    const userInDB = await knex("users").insert(newUser);
    return res.status(201).json(userInDB);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Failed registration" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send("Please enter the required fields");
  }

  try {
    const user = await knex("users").where({ email: email }).first();

    const passwordCorrect = bcrypt.compareSync(password, user.password);

    if (!passwordCorrect) {
      return res.status(400).send("Invalid password");
    }

    const token = jwt.sign(
      { id: user.id, role: user.role, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );
    // Respond with the token
    res.status(200).json({ token: token });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Failed login" });
  }
});

// profile
router.get("/profile", async (req, res) => {
  // Check for authorization header
  if (!req.headers.authorization) {
    return res.status(401).send({ error: "Please login" });
  }

  // Extract token from the authorization header
  const authToken = req.headers.authorization.split(" ")[1];

  if (!authToken || !process.env.JWT_SECRET) {
    return res.status(401).json({ error: "Auth token or secret is missing" });
  }

  try {
    const verified = jwt.verify(authToken, process.env.JWT_SECRET);
    if (verified) {
      const { id } = verified; // Destructure for clarity

      // Fetch user
      const user = await knex("users").where({ id }).first();

      if (!user) {
        // Check if user exists
        return res.status(404).json({ error: "User not found" });
      }

      res.json(user);
    }
  } catch (error) {
    return res.status(401).json({ error: "Invalid auth token" });
  }
});

export default router;
