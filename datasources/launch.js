import { RESTDataSource } from "@apollo/server/express4";

class LaunchAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "api.open5e.com/";
  }
  async getAllMonsters() {
    const response = await this.get("monsters?document__slug=wotc-srd");
    return Array.isArray(response)
      ? response.map((monster) => this.monsterReducer(monster))
      : [];
  }
  monsterReducer(monster) {
    return {
      name: monster.name || 0,
      cr: monster.cr,
    };
  }

  //   async getMonsterByName({ monsterName }) {
  //     const response = await this.get("monsters?document__slug=wotc-srd", { flight_number: launchId });
  //     return this.launchReducer(response[0]);
  //   }

  //   getLaunchesByIds({ launchIds }) {
  //     return Promise.all(
  //       launchIds.map(launchId => this.getLaunchById({ launchId })),
  //     );
  //   }
}
export default LaunchAPI;
