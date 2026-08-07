import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { User } from "../entities/users.js";
import { Review } from "../entities/review.js";
import { Favorite } from "../entities/favorite.js";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL!,
  ssl: {
    rejectUnauthorized: false,
  },
  synchronize: true,
  entities: [User, Review, Favorite],
});
