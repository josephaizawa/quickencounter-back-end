export const up = function (knex) {
  return knex.schema.createTable("monster_save", (table) => {
    table.increments("id").primary();
    table
      .integer("party_id")
      .unsigned()
      .references("party.id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table.string("name").notNullable();
    table.integer("cr").notNullable();
    table.string("image");
    table.string("environments");
  });
};

export const down = function (knex) {
  return knex.schema.dropTable("monster_save");
};
