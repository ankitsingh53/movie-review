import type { Request, Response } from "express";
import tmdb from "../configDB/tmdb.js";
// import type { getPopularMovies } from "../services/movie.service";

export const fetchPopularMovies = async (
  req: Request,
  res: Response
) => {
  try {
    console.log(process.env.TMDB_KEY)
    const response = await tmdb.get("/movie/popular");
    console.log(response.data)
    const movies = await response.data;
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch movies",
    });
  }
};