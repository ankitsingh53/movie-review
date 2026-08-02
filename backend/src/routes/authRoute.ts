import { Router } from "express";

import { register, login, logout, getCurrentUser } from '../controllers/authController.js'
import { authenticate } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/profile", authenticate, getCurrentUser)

router.post("/register", register);

router.post('/login', login);

router.post('/logout', logout);


export default router;