import express from "express";
import cors from "cors";
import authRoute from "./routes/authRoute.js";
import cookieParser from "cookie-parser";
import movieRoutes from "./routes/movieRoute.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());

app.get('/', (req, res)=>{
    res.send("Welcome to home page")
})

app.use('/user', authRoute);
app.use('/movies', movieRoutes)

export default app;