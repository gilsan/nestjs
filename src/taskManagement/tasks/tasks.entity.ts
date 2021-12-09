import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { TaskStatus } from "./model/task.model";


@Entity()
export class TasksEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus


}