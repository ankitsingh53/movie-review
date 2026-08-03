import { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import api from "../axios/apiService";
import MovieCard from "./MovieCard";
import Navbar from "./NavBar";

const Favorites = () => {
  const [favorites, setFavorites] = useState<any[]>([]);

  const handleRemoveFavorite = async (movieId: number) => {
    try {
      await api.delete(`/favorites/${movieId}`);

      setFavorites((prev) => prev.filter((movie) => movie.movieId !== movieId));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await api.get("/favorites");

        const favoriteMovies = await Promise.all(
          response.data.data.map(async (favorite: any) => {
            const movie = await api.get(`/movies/${favorite.movieId}`);

            return {
              favoriteId: favorite.id,
              movieId: favorite.movieId,
              ...movie.data,
            };
          }),
        );

        setFavorites(favoriteMovies);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <>
      <Navbar />

      <Box sx={{ bgcolor: "#121212", minHeight: "100vh", p: 4 }}>
        <Typography variant="h4" sx={{ color: "white", mb: 4 }}>
          My Favorites
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 3,
          }}
        >
          {favorites.map((movie) => (
            <Box key={movie.movieId}>
              <MovieCard
                id={movie.id}
                title={movie.title}
                posterPath={movie.poster_path}
                releaseDate={movie.release_date}
              />

              <Button
                fullWidth
                color="error"
                variant="contained"
                sx={{ mt: 1 }}
                onClick={() => handleRemoveFavorite(movie.movieId)}
              >
                Remove Favorite
              </Button>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default Favorites;
