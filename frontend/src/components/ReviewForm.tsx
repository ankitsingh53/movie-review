import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import api from "../axios/apiService";

interface FormProps {
  movieId: number;
  onReviewAdded: () => void;
}

const ReviewForm = ({ movieId, onReviewAdded }: FormProps) => {
  const [comment, setComment] = useState("");

  const handleSubmit = async () => {
    try {
      if (comment.trim() === "") {
        alert("Please enter comment.");
        return;
      }

      await api.post("/reviews/add-reviews", {
        movieId,
        comment,
      });
      setComment("");

      onReviewAdded();
    } catch (error) {
      if(error instanceof Error)
      console.log(error.message);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        maxWidth: 600,
      }}
    >
      <TextField
        multiline
        rows={4}
        placeholder="Write your review"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        sx={{
          bgcolor: "white",
          borderRadius: 1,
        }}
      />

      <Button variant="contained" onClick={handleSubmit}>
        Submit Review
      </Button>
    </Box>
  );
};

export default ReviewForm;
