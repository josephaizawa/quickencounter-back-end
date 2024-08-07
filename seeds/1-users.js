/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex("users").del();
  await knex("users").insert([
    {
      id: 100,
      first_name: "Glaxo",
      last_name: "Brooz",
      email: "gb@glax.broo",
      password: "1234567!",
      phone: "+1 (646) 123-1234",
      address: "123 Galaxy Way",
      role: "DM",
    },
    {
      id: 101,
      first_name: "Merin",
      last_name: "Knight",
      email: "mk@knight.co",
      password: "1234567!",
      phone: "+1 (646) 123-1234",
      address: "456 castle drive",
      role: "DM",
    },
    {
      id: 102,
      first_name: "Lou",
      last_name: "P",
      email: "lp@fun.me",
      password: "1234567!",
      phone: "+1 (646) 123-1234",
      address: "098 strawberry field",
      role: "DM",
    },
  ]);
}
