import type { Request, Response } from "express";
import tmdb from "../configDB/tmdb.js";
// import type { getPopularMovies } from "../services/movie.service";

export const fetchPopularMovies = async (
  req: Request,
  res: Response
) => {
  try {
    const response = await tmdb.get("/movie/popular");
    const movies = response.data;
    res.status(200).json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch movies",
    });
  }
};

export const fetchMovieByid = async (req:Request, res: Response)=>{
  try {
    const {id} = req.params;
    const response = await tmdb.get(`/movie/${id}`);
    res.status(200).json(response.data);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch movie details",
    });
  };
};

export const searchMovies = async (
  req: Request,
  res: Response
) => {
  try {
    const { query } = req.query;
    console.log("Search Controller Hit");
console.log(req.query);

    if (!query || typeof query !== "string") {
      res.status(400).json({
        message: "Search query is required",
      });
      return;
    }

    const response = await tmdb.get("/search/movie", {
      params: {
        query,
      },
    });

    res.status(200).json({
      data: response.data.results,
    });
  } catch (error) {
    console.error(error);

  res.status(500).json({     
   message: "Failed to search movies",
    });
  }
};