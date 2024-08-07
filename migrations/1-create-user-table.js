export const up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("first_name");
    table.string("last_name");
    table.string("email").notNullable().unique();
    table.string("password").notNullable();
    table.string("phone");
    table.string("address");
    table.string("role").defaultTo("DM");
  });
};

export const down = function (knex) {
  return knex.schema.dropTable("users");
};
