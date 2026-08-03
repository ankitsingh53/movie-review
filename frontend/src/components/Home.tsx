import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Navbar from "./NavBar";
import MovieCard from "./MovieCard";
import api from "../axios/apiService";
import SearchBar from "./SearchBar";
import Loader from "./Loader";
import { toast } from "react-toastify";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
}

const Home = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);

        const response = await api.get("/movies/popular");

        setMovies(response.data.results);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleAddFavorite = async (movieId: number) => {
  try {
    await api.post("/favorites", {
      movieId,
    });

    toast.success("Added to favorites");
  } catch (error: any) {
    toast.error(error.response?.data?.message);
  }
};

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
        <SearchBar
          setSearchResults={setSearchResults}
          setIsSearching={setIsSearching}
        />
        <Typography
          variant="h4"
          sx={{
            color: "white",
            fontWeight: "bold",
            mb: 4,
          }}
        >
          {isSearching ? "Search Results" : "Popular Movies"}
        </Typography>

        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 10,
            }}
          >
            <Loader/>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 10
            }}
          >
            {(isSearching ? searchResults : movies).map((movie) => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                posterPath={movie.poster_path}
                releaseDate={movie.release_date}
                onAddFavorite={handleAddFavorite}
              />            
            ))}
          </Box>
        )}
      </Box>
    </>
  );
};

export default Home;
