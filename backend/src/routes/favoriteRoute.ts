import { Router } from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import {
  addFavorite,
  getFavorites,
  removeFavorite,
} from "../controllers/favoriteController.js";

const router = Router();

router.post("/", authenticate, addFavorite);
router.get("/", authenticate, getFavorites);
router.delete("/:movieId", authenticate, removeFavorite);

export default router;