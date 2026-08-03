import { AppDataSource } from "../configDB/dataSource.js";
import { Favorite } from "../entities/favorite.js";

const favoriteRepository = AppDataSource.getRepository(Favorite);

export const addFavoriteService = async (
  userId: string,
  movieId: number
) => {
  const existingFavorite = await favoriteRepository.findOne({
    where: {
      movieId,
      user: {
        id: userId,
      },
    },
    relations: {
      user: true,
    },
  });

  if (existingFavorite) {
    throw {
      statusCode: 409,
      message: "Movie already exists in favorites",
    };
  }

  const favorite = favoriteRepository.create({
    movieId,
    user: {
      id: userId,
    },
  });

  return await favoriteRepository.save(favorite);
};

export const getFavoritesService = async (userId: string) => {
  return await favoriteRepository.find({
    where: {
      user: {
        id: userId,
      },
    },
    order: {
      createdAt: "DESC",
    },
  });
};

export const removeFavoriteService = async (
  userId: string,
  movieId: number
) => {
  const favorite = await favoriteRepository.findOne({
    where: {
      movieId,
      user: {
        id: userId,
      },
    },
    relations: {
      user: true,
    },
  });

  if (!favorite) {
    throw {
      statusCode: 404,
      message: "Favorite not found",
    };
  }

  await favoriteRepository.remove(favorite);
};