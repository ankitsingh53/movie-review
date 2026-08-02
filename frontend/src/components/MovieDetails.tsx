import {
  Box,
  Button,
  Divider,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Navbar from "./NavBar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../axios/apiService";
// import ReviewCard from "./ReviewCard";
// import ReviewForm from "./ReviewForm";

interface Genre {
  id: number;
  name: string;
}

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
  runtime: number;
  overview: string;
  genres: Genre[];
}

const MovieDetails = () => {
    const {id} = useParams();
    const [movie, setMovie] = useState<Movie | null>(null)

    useEffect(()=>{
        const fetchMovie = async ()=>{
            try {
                const response = await api.get(`movies/${id}`);
                setMovie(response.data)
            } catch (error) {
                console.error(error);
            }
        };
        fetchMovie();
    }, [id])

  return (
    <>
      <Navbar />

      <Box
        sx={{
          bgcolor: "#121212",
          minHeight: "100vh",
          color: "white",
          p: 4,
        }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={5}
        >
          <Box
            component="img"
            src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
            alt={movie?.title}
            sx={{
              width: 300,
              borderRadius: 2,
            }}
          />

          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h3"
              fontWeight="bold"
              gutterBottom
            >
              {movie?.title}
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                mb: 2,
              }}
            >
              <Rating
                value={movie?.vote_average / 2}
                precision={0.5}
                readOnly
              />

              <Typography>
                {movie?.vote_average?.toFixed(1)}
              </Typography>
            </Box>

            <Typography sx={{ mb: 1 }}>
              <strong>Release Date:</strong> {movie?.release_date}
            </Typography>

            <Typography sx={{ mb: 1 }}>
              <strong>Runtime:</strong> {movie?.runtime} min
            </Typography>

            <Typography sx={{ mb: 2 }}>
              <strong>Genres:</strong> {movie?.genres?.map((genre: any) => genre.name).join(", ")}
            </Typography>

            <Typography sx={{ mb: 4 }}>
              {movie?.overview}
            </Typography>

            <Button
              variant="contained"
              color="error"
              startIcon={<FavoriteBorderIcon />}
            >
              Add to Favorites
            </Button>
          </Box>
        </Stack>

        <Divider
          sx={{
            my: 5,
            bgcolor: "#444",
          }}
        />

        <Typography
          variant="h4"
          mb={3}
        >
          Reviews
        </Typography>

        {/* <ReviewCard /> */}

        {/* <ReviewCard /> */}

        <Divider
          sx={{
            my: 5,
            bgcolor: "#444",
          }}
        />

        <Typography
          variant="h4"
          mb={3}
        >
          Write a Review
        </Typography>

        {/* <ReviewForm /> */}
      </Box>
    </>
  );
};

export default MovieDetails;