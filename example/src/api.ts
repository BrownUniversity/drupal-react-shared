import axios from "axios";

export const adapter = axios.create({
  baseURL: "https://icanhazdadjoke.com",
  headers: { Accept: "application/json" }
});

export default {
  async getRandomJoke() {
    try {
      const response = await adapter.get("/");
      return response.data.joke;
    } catch (error) {
      throw new Error("Error fetching random joke");
    }
  },
  async getJokeSearchResults({ term }) {
    try {
      const response = await adapter.get(`/search?term=${term}`);
      return response.data.results;
    } catch (error) {
      throw new Error("Error fetching joke seach results");
    }
  }
};
