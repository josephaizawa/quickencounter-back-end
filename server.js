import express from "express";
import fs from "fs";
// import router from "./routes/videos.js";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema.js";
import axios from "axios";
import { graphql } from "graphql";

const resolvers = {
  Query: {
    // hello: () => "Hello from GraphQL!",
    monstersGeneral: async () => {
      try {
        const response = await axios.get(
          "https://api.open5e.com/monsters?document__slug=wotc-srd"
        );

        return response.data.results; // Assuming you want to return results array
      } catch (error) {
        throw new Error(`Error fetching monsters: ${error.message}`);
      }
    },

    monstersSpecific: async (parent, { name }) => {
      try {
        const response = await axios.get(
          `https://www.dnd5eapi.co/api/monsters/${name}`
        );

        return response.data.results; // Assuming you want to return results array
      } catch (error) {
        throw new Error(`Error fetching monsters: ${error.message}`);
      }
    },
  },
  MonsterGeneral: {
    monstersSpecific(parent) {
      let monsterinfo = parent;
      console.log(monsterinfo.name);
      return monsterinfo.find((m) => m.name == parent.name);
    },
  },
  // MonsterSpecific: {
  //   monstersGeneral(parent) {
  //     return response.data.find((m) => m.name == parent.name);
  //   },
  // },
};
// import cors from "cors";
// import dotenv from "dotenv";

// dotenv.config();
// app.use("/graphql", express.json());
const aServer = new ApolloServer({
  typeDefs,
  resolvers,
});
// await aServer.start();

const { url } = await startStandaloneServer(aServer, {
  listen: { port: 4000 },
});
// const app = express();

// const port = /*process.env.PORT ||*/ 8080;

// app.use("/public", express.static("public"));
// app.use(cors());

// app.use((req, res, next) => {
//   const apiKey = req.query.apiKey;

//   if (!apiKey || apiKey !== process.env.API_KEY) {
//     res.status(401).send("Unauthorized: API key is invalid or missing");
//     return;
//   }
//   next();
// });

// app.use("/videos", router);

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });
