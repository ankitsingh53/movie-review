import "reflect-metadata";
import { AppDataSource } from "./configDB/dataSource.js";
import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();
console.log("TMDB_KEY:", process.env.TMDB_KEY);

const startserver = async ()=>{
    try {
        await AppDataSource.initialize();
        console.log("Database connected successfully");

        
        const PORT = process.env.PORT || 3000;

        app.listen(PORT, ()=>{
            console.log(`Server is running at ${PORT}`);
        })
        
    } catch (error) {
        console.error("Server Error", error);
    }
};

startserver();