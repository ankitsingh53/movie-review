import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Navbar from "./NavBar";
import MovieCard from "./MovieCard";
import api from "../axios/apiService";
import SearchBar from "./SearchBar";
import Loader from "./Loader";
import { toast } from "react-toastify";
import axios from "axios";
import Pagination from "@mui/material/Pagination";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
}
interface User {
  id: string;
  name: string;
}

const Home = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await api.get("/user/profile");
      setCurrentUser(response.data.data);
    };

    fetchUser();
  }, []);

  console.log(currentUser);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);

        const response = await api.get(`/movies/popular?page=${page}`);

        setMovies(response.data.results);
        setTotalPages(response.data.total_pages);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data.message, {
            autoClose: 2000,
          });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page]);

  const handleAddFavorite = async (movieId: number) => {
    try {
      await api.post("/favorites", {
        movieId,
      });

      toast.success("Added to favorites");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message, {
          autoClose: 2000,
        });
      }
    }
  };

  return (
    <>
      <Navbar user={currentUser} />

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

        {loading && <Loader />}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 10,
            minHeight: "1100px",
          }}
        >
          {isSearching && searchResults.length === 0 ? (
            <Typography
              sx={{
                color: "white",
                textAlign: "center",
                width: "100%",
                mt: 5,
              }}
            >
              No movies found.
            </Typography>
          ) : (
            (isSearching ? searchResults : movies).map((movie) => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                posterPath={movie.poster_path}
                releaseDate={movie.release_date}
                onAddFavorite={handleAddFavorite}
              />
            ))
          )}
        </Box>

        {!isSearching && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 5,
            }}
          >
            <Pagination
              page={page}
              count={Math.min(totalPages, 20)}
              siblingCount={1}
              boundaryCount={1}
              showFirstButton
              showLastButton
              color="primary"
              onChange={(_, value) => setPage(value)}
              sx={{
                "& .MuiPaginationItem-root": {
                  color: "white",
                },
              }}
            />
          </Box>
        )}
      </Box>
    </>
  );
};

export default Home;
