import {
  Box,
  Button,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Navbar from "./NavBar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../axios/apiService";
import ReviewForm from "./ReviewForm";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import TextField from "@mui/material/TextField";

interface Genre {
  id: number;
  name: string;
}

interface Review {
  id: number;
  comment: string;
  user: {
    id: string;
    name: string;
  };
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
  const { id } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [editingReviewId, setEditingReviewId] = useState<number | null>(null);
  const [editComment, setEditComment] = useState("");
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await api.get("/user/profile");
      setCurrentUser(response.data.data);
    };

    fetchUser();
  }, []);

  const handleDelete = async (reviewId: number) => {
    try {
      await api.delete(`/reviews/${reviewId}`);
      fetchReviews();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async () => {
    try {
      await api.put(`/reviews/${editingReviewId}`, {
        comment: editComment,
      });

      setEditingReviewId(null);
      fetchReviews();
    } catch (error) {
      console.error(error);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await api.get(`/reviews/${id}`);
      console.log(response.data.data);
      setReviews(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await api.get(`movies/${id}`);
        setMovie(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMovie();
  }, [id]);
  useEffect(() => {
    if (id) {
      fetchReviews();
    }
  }, [id]);

  console.log(currentUser)

  return (
    <>
      <Navbar/>

      <Box
        sx={{
          bgcolor: "#121212",
          minHeight: "100vh",
          color: "white",
          p: 4,
        }}
      >
        <Stack direction={{ xs: "column", md: "row" }} spacing={5}>
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
            <Typography variant="h3" sx={{ fontWeight: "bold" }} gutterBottom>
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
            </Box>

            <Typography sx={{ mb: 1 }}>
              <strong>Release Date:</strong> {movie?.release_date}
            </Typography>

            <Typography sx={{ mb: 1 }}>
              <strong>Runtime:</strong> {movie?.runtime} min
            </Typography>

            <Typography sx={{ mb: 2 }}>
              <strong>Genres:</strong>{" "}
              {movie?.genres?.map((genre: any) => genre.name).join(", ")}
            </Typography>

            <Typography sx={{ mb: 4 }}>{movie?.overview}</Typography>

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

        <Typography variant="h4" sx={{ mb: 3 }}>
          Reviews
        </Typography>

        {Array.isArray(reviews) && reviews.length > 0 ? (
          reviews.map((review) => (
            <Paper
              key={review.id}
              sx={{
                bgcolor: "#1E1E1E",
                color: "white",
                p: 3,
                mb: 2,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {review.user.name}
              </Typography>

              {editingReviewId === review.id ? (
                <>
                  <TextField
                    fullWidth
                    value={editComment}
                    onChange={(e) => setEditComment(e.target.value)}
                    sx={{
                      bgcolor: "white",
                      my: 2,
                    }}
                  />

                  <Button variant="contained" onClick={handleUpdate}>
                    Save
                  </Button>
                </>
              ) : (
                  <Typography>{review.comment}</Typography>
              )}

              

              {currentUser?.id === review.user.id && (
                <Box>
              <IconButton color="error" onClick={() => handleDelete(review.id)}>
                <DeleteIcon />
              </IconButton>
              <IconButton
                color="primary"
                onClick={() => {
                  setEditingReviewId(review.id);
                  setEditComment(review.comment);
                }}
              >
                <EditIcon />
              </IconButton>
              </Box>
              )}
            </Paper>
          ))
        ) : (
          <Typography
            sx={{
              color: "#B0B0B0",
              textAlign: "center",
              mt: 2,
            }}
          >
            No reviews yet. Be the first to review this movie!
          </Typography>
        )}

        <Divider
          sx={{
            my: 5,
            bgcolor: "#444",
          }}
        />

        <Typography variant="h4" sx={{ mb: 3 }}>
          Write a Review
        </Typography>

        <ReviewForm movieId={Number(id)} onReviewAdded={fetchReviews} />
      </Box>
    </>
  );
};

export default MovieDetails;
