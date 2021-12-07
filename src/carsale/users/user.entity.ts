
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserList {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  email: string;

  @Column({ length: 100 })
  password: string;

}