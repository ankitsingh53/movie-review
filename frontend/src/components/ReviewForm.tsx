import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import api from "../axios/apiService";
import axios from "axios";
import { toast } from "react-toastify";

interface FormProps {
  movieId: number;
  onReviewAdded: () => void;
}

const ReviewForm = ({ movieId, onReviewAdded }: FormProps) => {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!comment.trim()) {
      toast.error("Please write a review.");
      return;
    }

    try {
      setLoading(true);

      await api.post("/reviews/add-reviews", {
        movieId,
        comment,
      });

      toast.success("Review added successfully");

      setComment("");
      onReviewAdded();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ?? "Something went wrong"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      <TextField
        fullWidth
        multiline
        rows={6}
        placeholder="Write your review here..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        sx={{
          "& .MuiOutlinedInput-root": {
            bgcolor: "#FFFFFF",
            borderRadius: 2,
            fontSize: 15,
          },
        }}
      />

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          variant="contained"
          disabled={loading}
          onClick={handleSubmit}
          sx={{
            width: 180,
            height: 48,
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 600,
            fontSize: 15,
          }}
        >
          {loading ? "Submitting..." : "Submit Review"}
        </Button>
      </Box>
    </Box>
  );
};

export default ReviewForm;