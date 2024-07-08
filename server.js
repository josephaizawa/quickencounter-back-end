import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import knex from "knex";
import monsters from "./routes/monsters.js";

const app = express();
app.use(express.json());
dotenv.config();

const port = process.env.PORT || 8080;

app.use(cors({ origin: process.env.FRONT_END }));

app.use("/monsters", monsters);

app.listen(port, () => {
  console.log(`App is running on port: ${port}`);
});
