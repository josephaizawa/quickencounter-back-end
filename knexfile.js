// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

import dotenv from "dotenv";
dotenv.config();

// import "dotenv/config";
// require("dotenv").config();

export default {
  client: "mysql2",
  connection: {
    host: "127.0.0.1",
    user: "root",
    password: "rootroot",
    database: "dnd",
    charset: "utf8",
  },
};
