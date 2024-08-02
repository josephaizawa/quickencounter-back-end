export const up = function (knex) {
  return knex.schema.createTable("party", (table) => {
    table.increments("id").primary();
    table
      .integer("user_id")
      .unsigned()
      .references("users.id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table.string("name").notNullable();
    table.integer("level");
  });
};

export const down = function (knex) {
  return knex.schema.dropTable("party");
};
