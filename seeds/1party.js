/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex("party").del();
  await knex("party").insert([
    {
      id: 100,
      user_id: 104,
      name: "team discovery channel",
      level: 5,
    },
    {
      id: 102,
      user_id: 104,
      name: "team strike force",
      level: 10,
    },
  ]);
}
