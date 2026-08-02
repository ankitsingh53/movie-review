import { Router } from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import { addReview, updateReview, getReviewsByMovieId, deleteReview } from "../controllers/reviewController.js";

const router = Router();

router.post("/add-reviews", authenticate, addReview)
router.put("/:id", authenticate, updateReview)
router.get("/:movieId", authenticate, getReviewsByMovieId)
router.delete("/:id", authenticate, deleteReview)



export default router;