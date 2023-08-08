// src/entities/Post.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';


@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @ManyToOne(() => User, user => user.posts) // Establish the many-to-one relationship
  @JoinColumn({ name: 'user_id' }) // Foreign key column in the posts table
  user: User; // Reference to the related user
}
