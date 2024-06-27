// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

import dotenv from "dotenv";
dotenv.config();

// import "dotenv/config";
// require("dotenv").config(); 


export default  {
  client: "mysql2",
  connection: {
    host: "127.0.0.1",
    // port: 3306,
    user: process.env.DB_LOCAL_USER,
    password: process.env.DB_LOCAL_PASSWORD,
    database: process.env.DB_LOCAL_DBNAME,
    charset: "utf8"
  },
};




