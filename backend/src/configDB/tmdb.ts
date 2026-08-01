import axios from "axios";

const tmdb = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
  api_key: process.env.TMDB_KEY,
}
});

export default tmdb;