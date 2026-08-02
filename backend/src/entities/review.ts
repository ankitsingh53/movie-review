
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./users.js";

@Entity({ name: "reviews" })
export class Review {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: "int",
  })
  movieId!: number;

  @Column({
    type: "text",
  })
  comment!: string;

  @ManyToOne(()=>User, (user)=>user.reviews, {
    onDelete: "CASCADE"
  })
  @JoinColumn({name: "userId"})
  user!: User;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}