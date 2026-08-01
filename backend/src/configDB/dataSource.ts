import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { User } from "../entities/users.js";
import { Review } from "../entities/review.js";
import { Favorite } from "../entities/favorite.js";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST!,
    port: Number(process.env.DB_PORT!),
    username: process.env.DB_USERNAME!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_DATABASE!,
    synchronize: true,
    entities: [User, Review, Favorite],
});