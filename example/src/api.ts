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
    } catch (e) {
      throw new Error("Error fetching random joke");
    }
  }
};
