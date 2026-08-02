import { AppDataSource } from "../configDB/dataSource.js";
import { Review } from "../entities/review.js";
import { User } from "../entities/users.js";

const reviewRepository = AppDataSource.getRepository(Review);
const userRepository = AppDataSource.getRepository(User);

export const addReviewService = async (
  userId: string,
  movieId: number,
  comment: string
) => {
  const user = await userRepository.findOne({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw {
      statusCode: 404,
      message: "User not found",
    };
  }

  const existingReview = await reviewRepository.findOne({
    where: {
      movieId,
      user: {
        id: userId,
      },
    },
    relations: {
        user: true,
    }
  });

  if (existingReview) {
    throw {
      statusCode: 409,
      message: "You have already reviewed this movie",
    };
  }

  const review = reviewRepository.create({
    movieId,
    comment,
    user,
  });

  await reviewRepository.save(review);

  return review;
};


export const updateReviewService = async (
  reviewId: number,
  userId: string,
  comment: string
) => {
  const review = await reviewRepository.findOne({
    where: {
      id: reviewId,
    },
    relations: {
      user: true,
    },
  });

  if (!review) {
    throw {
      statusCode: 404,
      message: "Review not found",
    };
  }

  if (review.user.id !== userId) {
    throw {
      statusCode: 403,
      message: "You are not authorized to update this review",
    };
  }
  
  review.comment = comment;

  await reviewRepository.save(review);

  return review;
};


export const getReviewsByMovieIdService = async (movieId: number) => {
  const reviews = await reviewRepository.find({
    where: {
      movieId,
    },
    relations: {
      user: true,
    },
    order: {
      createdAt: "DESC",
    },
  });

  return reviews;
};


export const deleteReviewService = async (
  reviewId: number,
  userId: string
) => {
  const review = await reviewRepository.findOne({
    where: {
      id: reviewId,
    },
    relations: {
      user: true,
    },
  });

  if (!review) {
    throw {
      statusCode: 404,
      message: "Review not found",
    };
  }

  if (review.user.id !== userId) {
    throw {
      statusCode: 403,
      message: "You are not authorized to delete this review",
    };
  }

  await reviewRepository.remove(review);

  return;
};