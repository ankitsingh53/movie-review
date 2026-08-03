import type { Response } from "express";
import type { AuthRequest } from "../middlewares/authMiddleware.js";
import {
  addFavoriteService,
  getFavoritesService,
  removeFavoriteService,
} from "../services/favoriteService.js";

export const addFavorite = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { movieId } = req.body;

    if (!movieId || isNaN(Number(movieId))) {
      res.status(400).json({
        message: "Valid movieId is required",
      });
      return;
    }

    const favorite = await addFavoriteService(
      req.user!.id,
      Number(movieId)
    );

    res.status(201).json({
      message: "Movie added to favorites",
      data: favorite,
    });
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      message: error.message || "Internal Server Error",
    });
  }
};

export const getFavorites = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const favorites = await getFavoritesService(req.user!.id);

    res.status(200).json({
      message: "Favorites fetched successfully",
      data: favorites,
    });
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      message: error.message || "Internal Server Error",
    });
  }
};

export const removeFavorite = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const movieId = Number(req.params.movieId);

    if (isNaN(movieId)) {
      res.status(400).json({
        message: "Invalid movieId",
      });
      return;
    }

    await removeFavoriteService(req.user!.id, movieId);

    res.status(200).json({
      message: "Favorite removed successfully",
    });
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      message: error.message || "Internal Server Error",
    });
  }
};