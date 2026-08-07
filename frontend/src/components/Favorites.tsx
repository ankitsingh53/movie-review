import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import api from "../axios/apiService";
import Navbar from "./NavBar";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

interface Favorite {
  id: number;
  movieId: number;
}

interface Movie {
  favoriteId: number;
  movieId: number;
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
}
interface User {
  id: string;
  name: string;
}

const Favorites = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const handleRemoveFavorite = async (movieId: number) => {
    try {
      await api.delete(`/favorites/${movieId}`);

      setFavorites((prev) => prev.filter((movie) => movie.movieId !== movieId));
      toast.success("Deleted Successfully", {
        autoClose: 2000,
      });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message, {
          autoClose: 2000,
        });
      }
    }
  };

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setLoading(true);
        const response = await api.get("/favorites");

        const favoriteMovies = await Promise.all(
          response.data.data.map(async (favorite: Favorite) => {
            const movie = await api.get(`/movies/${favorite.movieId}`);

            return {
              favoriteId: favorite.id,
              movieId: favorite.movieId,
              ...movie.data,
            };
          }),
        );
        setFavorites(favoriteMovies);
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

    const fetchUser = async () => {
      try {
        const response = await api.get("/user/profile");
        setCurrentUser(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
    fetchFavorites();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Navbar user={currentUser} />

      <Box sx={{ bgcolor: "#121212", minHeight: "100vh", p: 4 }}>
        <Typography variant="h4" sx={{ color: "white", mb: 4 }}>
          My Favorites
        </Typography>

        {favorites.length === 0 ? (
          <Box
            sx={{
              minHeight: "70vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                bgcolor: "#1E1E1E",
                p: 5,
                borderRadius: 3,
                textAlign: "center",
                width: "100%",
                maxWidth: 500,
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  mb: 2,
                }}
              >
                No Favorite Movies
              </Typography>

              <Typography
                sx={{
                  color: "#BDBDBD",
                  mb: 4,
                }}
              >
                Browse movies and add your favorite ones.
              </Typography>

              <Button
                variant="contained"
                onClick={() => navigate("/home")}
                sx={{
                  borderRadius: 2,
                  px: 4,
                  textTransform: "none",
                }}
              >
                Browse Movies
              </Button>
            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 4,
            }}
          >
            {favorites.map((movie) => (
              <Card
                key={movie.movieId}
                sx={{
                  width: 350,
                  bgcolor: "#1E1E1E",
                  color: "white",
                  borderRadius: 3,
                  overflow: "hidden",
                  transition: ".3s",
                  "&:hover": {
                    transform: "translateY(-6px)",
                  },
                }}
              >
                <Stack spacing={2}>
                  <CardMedia
                    component="img"
                    height="370"
                    image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                  />

                  <CardContent>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "bold",
                        mb: 1,
                      }}
                    >
                      {movie.title}
                    </Typography>

                    <Typography
                      sx={{
                        color: "#BDBDBD",
                        mb: 2,
                      }}
                    >
                      Release Date: {movie.release_date}
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Button
                        color="error"
                        variant="contained"
                        onClick={() => handleRemoveFavorite(movie.movieId)}
                      >
                        Remove
                      </Button>

                      <Button
                        variant="contained"
                        onClick={() => navigate(`/movie/${movie.id}`)}
                      >
                        Details
                      </Button>
                    </Box>
                  </CardContent>
                </Stack>
              </Card>
            ))}
          </Box>
        )}
      </Box>
    </>
  );
};

export default Favorites;
