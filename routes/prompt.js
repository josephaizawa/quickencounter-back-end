import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const router = express.Router();
// // GoogleGenerativeAI required config
// const configuration = new GoogleGenerativeAI(process.env.API_KEY);

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

router.get("/", async (req, res) => {
  const prompt =
    "Write a few sentence description about how a dungeons and dragons adventuring party first encounters a chimera. Leave the descriptions of the environment general. Leave the descriptions of how they found the creature general. ";

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  return res.status(201).json(text);
});
router.post("/encounter", async (req, res) => {
  const monsterNames = req.body;

  const combinedMonsterNames = monsterNames.join(" ");

  const prompt = `Write a few sentence description about how a dungeons and dragons adventuring party first encounters a ${combinedMonsterNames}. Leave the descriptions of the environment out. Leave the descriptions of how they found the creature out.`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  return res.status(201).json(text);
});

export default router;
