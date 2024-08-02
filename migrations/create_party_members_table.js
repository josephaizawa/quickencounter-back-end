export const up = function (knex) {
  return knex.schema.createTable("party_members", (table) => {
    table.increments("id").primary();
    table
      .integer("party_id")
      .unsigned()
      .references("party.id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table.string("name").notNullable();
    table.integer("level").notNullable();
  });
};

export const down = function (knex) {
  return knex.schema.dropTable("party_members");
};
