import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import Navbar from "./NavBar";
import ReviewForm from "./ReviewForm";
import Loader from "./Loader";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../axios/apiService";
import axios from "axios";
import { toast } from "react-toastify";

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
  backdrop_path: string;
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
  const [currentUser, setCurrentUser] = useState<any>(null);

  const [editingReviewId, setEditingReviewId] = useState<number | null>(null);

  const [editComment, setEditComment] = useState("");

  const [loading, setLoading] = useState(true);

  const fetchMovie = async () => {
    try {
      setLoading(true);

      const response = await api.get(`/movies/${id}`);

      setMovie(response.data);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await api.get(`/reviews/${id}`);

      setReviews(response.data.data);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  };

  const fetchCurrentUser = async () => {
    try {
      const response = await api.get("/user/profile");
      setCurrentUser(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMovie();
    fetchReviews();
    fetchCurrentUser();
  }, [id]);

  const handleAddFavorite = async () => {
    try {
      await api.post("/favorites", {
        movieId: Number(id),
      });

      toast.success("Movie added to favorites");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  };

  const handleDelete = async (reviewId: number) => {
    try {
      await api.delete(`/reviews/${reviewId}`);

      toast.success("Review deleted");
      fetchReviews();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  };

  const handleUpdate = async () => {
    try {
      await api.put(`/reviews/${editingReviewId}`, {
        comment: editComment,
      });

      toast.success("Review updated");

      setEditingReviewId(null);
      setEditComment("");

      fetchReviews();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  };

  return (
    <>
      <Navbar user={currentUser} />

      {loading && <Loader />}

      <Box
        sx={{
          bgcolor: "#121212",
          minHeight: "100vh",
          color: "white",
        }}
      >
        <Box
          sx={{
            position: "relative",
            minHeight: 520,
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url(https://image.tmdb.org/t/p/original${movie?.backdrop_path})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "blur(4px)",
              transform: "scale(1.05)",
              opacity: 0.6,
            }}
          />

          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to right, rgba(18,18,18,.95) 30%, rgba(18,18,18,.75) 70%, rgba(18,18,18,.95) 100%)",
            }}
          />

          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={5}
            sx={{
              position: "relative",
              zIndex: 2,
              p: { xs: 3, md: 6 },
              alignItems: "center",
            }}
          >
            <Box
              component="img"
              src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
              alt={movie?.title}
              sx={{
                width: 300,
                borderRadius: 3,
                boxShadow: "0 10px 30px rgba(0,0,0,.5)",
              }}
            />

            <Box sx={{ flex: 1 }}>
              <Typography variant="h3" sx={{ fontWeight: "bold" }} gutterBottom>
                {movie?.title}
              </Typography>

              <Typography
                sx={{
                  color: "#FFD54F",
                  fontWeight: 600,
                  mb: 3,
                }}
              >
                ⭐ {movie?.vote_average?.toFixed(1)} / 10
              </Typography>

              <Typography sx={{ mb: 1 }}>
                <strong>Release Date :</strong>{" "}
                <span style={{ color: "#BDBDBD" }}>{movie?.release_date}</span>
              </Typography>

              <Typography sx={{ mb: 1 }}>
                <strong>Runtime :</strong>{" "}
                <span style={{ color: "#BDBDBD" }}>{movie?.runtime} min</span>
              </Typography>

              <Typography sx={{ mb: 1 }}>
                <strong>Genres :</strong>{" "}
                <span style={{ color: "#BDBDBD" }}>
                  {movie?.genres?.map((g) => g.name).join(", ")}
                </span>
              </Typography>

              <Typography
                sx={{
                  color: "#D0D0D0",
                  lineHeight: 1.9,
                  maxWidth: 850,
                }}
              >
                {movie?.overview}
              </Typography>

              <Button
                variant="contained"
                color="error"
                startIcon={<FavoriteBorderIcon />}
                onClick={handleAddFavorite}
                sx={{
                  mt: 4,
                  borderRadius: 2,
                  px: 4,
                  textTransform: "none",
                }}
              >
                Add to Favorites
              </Button>
            </Box>
          </Stack>
        </Box>

        <Box sx={{ p: { xs: 2, md: 5 } }}>
          <Divider
            sx={{
              borderColor: "#333",
              mb: 5,
            }}
          />

          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mb: 3,
              color: "#FFFFFF",
            }}
          >
            Reviews
          </Typography>

          {reviews.length === 0 ? (
            <Paper
              elevation={0}
              sx={{
                bgcolor: "#1E1E1E",
                borderRadius: 3,
                p: 5,
                textAlign: "center",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: "#FFFFFF",
                }}
              >
                No Reviews Yet
              </Typography>

              <Typography
                sx={{
                  color: "#9E9E9E",
                  mt: 1,
                }}
              >
                Be the first person to review this movie.
              </Typography>
            </Paper>
          ) : (
            reviews.map((review) => (
              <Paper
                key={review.id}
                elevation={0}
                sx={{
                  bgcolor: "#1E1E1E",
                  borderRadius: 3,
                  mb: 3,
                  overflow: "hidden",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    p: 3,
                    borderBottom: "1px solid #303030",
                  }}
                >
                  <Stack
                    direction="row"
                    spacing={2}
                    sx={{ alignItems: "center" }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: "#1976d2",
                        width: 46,
                        height: 46,
                        fontWeight: "bold",
                      }}
                    >
                      {review.user.name.charAt(0).toUpperCase()}
                    </Avatar>

                    <Box>
                      <Typography
                        sx={{
                          color: "#FFFFFF",
                          fontWeight: 700,
                          fontSize: 17,
                        }}
                      >
                        {review.user.name}
                      </Typography>

                      <Typography
                        sx={{
                          color: "#9E9E9E",
                          fontSize: 13,
                        }}
                      >
                        Movie Review
                      </Typography>
                    </Box>
                  </Stack>

                  {currentUser?.id === review.user.id && (
                    <Stack direction="row" spacing={1}>
                      <IconButton
                        onClick={() => {
                          setEditingReviewId(review.id);
                          setEditComment(review.comment);
                        }}
                        sx={{
                          bgcolor: "#2B2B2B",
                          "&:hover": {
                            bgcolor: "#3A3A3A",
                          },
                        }}
                      >
                        <EditIcon color="primary" />
                      </IconButton>

                      <IconButton
                        onClick={() => handleDelete(review.id)}
                        sx={{
                          bgcolor: "#2B2B2B",
                          "&:hover": {
                            bgcolor: "#3A3A3A",
                          },
                        }}
                      >
                        <DeleteIcon color="error" />
                      </IconButton>
                    </Stack>
                  )}
                </Box>

                <Box sx={{ p: 3 }}>
                  {editingReviewId === review.id ? (
                    <>
                      <TextField
                        fullWidth
                        multiline
                        rows={5}
                        value={editComment}
                        onChange={(e) => setEditComment(e.target.value)}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            bgcolor: "#FFFFFF",
                            borderRadius: 2,
                          },
                        }}
                      />

                      <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
                        <Button variant="contained" onClick={handleUpdate}>
                          Save
                        </Button>

                        <Button
                          variant="outlined"
                          color="inherit"
                          onClick={() => {
                            setEditingReviewId(null);
                            setEditComment("");
                          }}
                        >
                          Cancel
                        </Button>
                      </Stack>
                    </>
                  ) : (
                    <Typography
                      sx={{
                        color: "#D5D5D5",
                        lineHeight: 1.9,
                        fontSize: 15,
                        padding: "20px",
                      }}
                    >
                      {review.comment}
                    </Typography>
                  )}
                </Box>
              </Paper>
            ))
          )}
          <Divider
            sx={{
              my: 6,
              borderColor: "#333",
            }}
          />

          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: "#FFFFFF",
              mb: 3,
            }}
          >
            Write a Review
          </Typography>

          <Paper
            elevation={0}
            sx={{
              bgcolor: "#1E1E1E",
              borderRadius: 3,
              p: 4,
              maxWidth: 900,
              mx: "auto",
            }}
          >
            <Typography
              sx={{
                color: "#9E9E9E",
                mb: 3,
              }}
            >
              Share your thoughts about this movie.
            </Typography>

            <ReviewForm movieId={Number(id)} onReviewAdded={fetchReviews} />
          </Paper>
        </Box>
      </Box>
    </>
  );
};

export default MovieDetails;
