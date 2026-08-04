import { Router } from "express";

import { register, login, logout, getCurrentUser, forgotPassword } from '../controllers/authController.js'
import { authenticate } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/profile", authenticate, getCurrentUser)

router.post("/register", register);

router.post('/login', login);

router.post('/logout', logout);

router.post('/forgotpassword', forgotPassword);



export default router;