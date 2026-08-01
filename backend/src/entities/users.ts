import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Review } from "./review.js";
import { Favorite } from "./favorite.js";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column({
    type: "varchar",
    length: 100,
  })
  name!: string;

  @Column({
    type: "varchar",
    unique: true,
  })
  email!: string;

  @Column({
    type: "varchar",
  })
  password!: string;

  @OneToMany(()=>Review, (review)=>review.user)
  reviews!: Review[];

  @OneToMany(()=>Favorite, (favorite)=>favorite.user)
  favorites!: Favorite[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}