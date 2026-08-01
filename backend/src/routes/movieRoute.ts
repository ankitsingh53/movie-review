import { Router } from "express";
import { fetchPopularMovies } from "../controllers/movieController.js";

const router = Router();

router.get("/popular", fetchPopularMovies);

export default router;