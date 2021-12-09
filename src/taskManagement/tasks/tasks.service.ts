import { Injectable } from "@nestjs/common";
import { Task, TaskStatus } from "./model/task.model";
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from "./dtos/tasks.dto";
import { Repository } from "typeorm";
import { TasksEntity } from "./tasks.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { TasksRepository } from "./tasks.repository";

@Injectable()
export class TasksService {

  private tasks: Task[] = [];

  constructor(
    @InjectRepository(TasksRepository)
    private repo: TasksRepository
  ) { }


  getAllTasks() {
    return this.tasks;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN
    }
    this.tasks.push(task)
    return task;
  }


  getTaskById(id: string): Task {
    const idx = this.tasks.findIndex(list => list.id === id);
    return this.tasks[idx];
  }

  deleteTask(id: string): { result: string } {
    const idx = this.tasks.findIndex(list => list.id === id);
    this.tasks.splice(idx, 1);
    return { result: 'OK' }
  }

  updateTask(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }

}