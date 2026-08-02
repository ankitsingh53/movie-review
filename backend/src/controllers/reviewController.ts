import type { Request, Response } from "express";
import type { AuthRequest } from "../middlewares/authMiddleware.js";
import { addReviewService, updateReviewService } from "../services/reviewService.js";
import { deleteReviewService } from "../services/reviewService.js";
import { getReviewsByMovieIdService} from "../services/reviewService.js";


export const addReview = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { movieId, comment } = req.body;

    if (!movieId || !comment) {
      res.status(400).json({
        message: "All fields are required",
      });
      return;
    }

    const review = await addReviewService(
      req.user!.id,
      movieId,
      comment
    );

    res.status(201).json({
      message: "Review added successfully",
      data: review,
    });
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      message: error.message || "Internal Server Error",
    });
  }
};

export const updateReview = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const {comment } = req.body;

    if (!comment) {
      res.status(400).json({
        message: "Comment are required",
      });
      return;
    }

    const review = await updateReviewService(
      Number(id),
      req.user!.id,
      comment
    );

    res.status(200).json({
      message: "Review updated successfully",
      data: review,
    });
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      message: error.message || "Internal Server Error",
    });
  }
};


export const getReviewsByMovieId = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const movieId = Number(req.params.movieId);

    if (isNaN(movieId)) {
      res.status(400).json({
        message: "Invalid movie id",
      });
      return;
    }

    const reviews = await getReviewsByMovieIdService(movieId);

    res.status(200).json({
      message: "Reviews fetched successfully",
      data: reviews,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};


export const deleteReview = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const reviewId = Number(req.params.id);

    if (isNaN(reviewId)) {
      res.status(400).json({
        message: "Invalid review id",
      });
      return;
    }

    await deleteReviewService(reviewId, req.user!.id);

    res.status(200).json({
      message: "Review deleted successfully",
    });
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      message: error.message || "Internal Server Error",
    });
  }
};