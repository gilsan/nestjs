import { Injectable } from "@nestjs/common";
import { Task, TaskStatus } from "./model/task.model";
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from "./dtos/tasks.dto";

@Injectable()
export class TasksService {

  private tasks: Task[] = [];

  getAllTasks() {
    return this.tasks;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    console.log(createTaskDto);
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