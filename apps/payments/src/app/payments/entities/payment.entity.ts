import { Entity, Column, ObjectIdColumn, ObjectId } from 'typeorm';

@Entity()
export class Payment {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  username: string;

  @Column()
  amount: number;

  @Column()
  userId: number;
}