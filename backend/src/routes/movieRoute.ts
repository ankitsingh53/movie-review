import { Router } from "express";
import { fetchMovieByid, fetchPopularMovies, searchMovies } from "../controllers/movieController.js";

const router = Router();

router.get("/popular", fetchPopularMovies);
router.get("/search", searchMovies);
router.get("/:id", fetchMovieByid);


export default router;