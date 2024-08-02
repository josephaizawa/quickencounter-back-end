/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex("party_members").del();
  await knex("party_members").insert([
    {
      id: 100,
      party_id: 100,
      name: "Member 1",
      level: 1,
    },
    {
      id: 101,
      party_id: 100,
      name: "Member 2",
      level: 1,
    },
    {
      id: 102,
      party_id: 100,
      name: "Member 3",
      level: 1,
    },
    {
      id: 103,
      party_id: 100,
      name: "Member 4",
      level: 1,
    },
    {
      id: 104,
      party_id: 100,
      name: "Member 5",
      level: 1,
    },
    {
      id: 105,
      party_id: 101,
      name: "1 Hero",
      level: 3,
    },
    {
      id: 106,
      party_id: 101,
      name: "2 Hero",
      level: 3,
    },
    {
      id: 107,
      party_id: 101,
      name: "3 Hero",
      level: 2,
    },
    {
      id: 108,
      party_id: 101,
      name: "4 Hero",
      level: 2,
    },
  ]);
}
