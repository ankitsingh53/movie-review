import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  Unique,
} from "typeorm";
import { User } from "./users.js";

@Entity({ name: "favorites" })
@Unique(["user", "movieId"])
export class Favorite {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column({
    type: "int",
  })
  movieId!: number;

  @ManyToOne(()=>User, (user)=>user.favorites, {
    onDelete: "CASCADE",
  })
  @JoinColumn({name: "userId"})
  user!: User;

  @CreateDateColumn()
  createdAt!: Date;
}