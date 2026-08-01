import { Box, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Navbar from "./NavBar";
import MovieCard from "./MovieCard";
import api from "../axios/apiService";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
}

const Home = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  
useEffect(() => {
  const fetchMovies = async () => {
    try {
      setLoading(true);

      const response = await api.get("/movie/popular");

      setMovies(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  fetchMovies();
}, []);

  return (
    <>
      <Navbar />
      

      <Box
        sx={{
          bgcolor: "#121212",
          minHeight: "100vh",
          p: 4,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: "white",
            fontWeight: "bold",
            mb: 4,
          }}
        >
          Popular Movies
        </Typography>

        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 10,
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 4,
            }}
          >
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                posterPath={movie.poster_path}
                rating={movie.vote_average}
                releaseDate={movie.release_date}
                // onFavorite={handleFavorite}
              />
            ))}
          </Box>
        )}
      </Box>
    </>
  );
};

export default Home;
