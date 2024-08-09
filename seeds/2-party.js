export async function seed(knex) {
  await knex("party").del();
  await knex("party").insert([
    {
      id: 100,
      user_id: 102,
      name: "team discovery channel",
      level: 5,
    },
    {
      id: 101,
      user_id: 102,
      name: "team strike force",
      level: 10,
    },
  ]);
}
