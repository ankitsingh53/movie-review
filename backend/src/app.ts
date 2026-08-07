import express from "express";
import cors from "cors";
import authRoute from "./routes/authRoute.js";
import cookieParser from "cookie-parser";
import movieRoutes from "./routes/movieRoute.js";
import reviewRoutes from "./routes/reviewRoute.js"
import favoriteRoutes from "./routes/favoriteRoute.js";
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(cookieParser());

app.use('/user', authRoute);
app.use('/movies', movieRoutes)
app.use("/reviews", reviewRoutes)
app.use("/favorites", favoriteRoutes);

export default app;