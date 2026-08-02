import express from "express";
import cors from "cors";
import authRoute from "./routes/authRoute.js";
import cookieParser from "cookie-parser";
import movieRoutes from "./routes/movieRoute.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(cookieParser());

app.use('/user', authRoute);
app.use('/movies', movieRoutes)

export default app;