import { Injectable, NotFoundException } from "@nestjs/common";
import { TaskStatus } from "./model/task.model";
import { v4 as uuid } from 'uuid';
import { CreateTaskDto, GetTasksFilterDto } from "./dtos/tasks.dto";
import { DeleteResult, Repository } from "typeorm";
import { Task } from "./tasks.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../auth/user.entity";


@Injectable()
export class TasksService {


  constructor(
    @InjectRepository(Task) private repo: Repository<Task>
  ) { }


  // async getAllTasks(): Promise<Task[]> {
  //   return this.repo.find();
  // }
  async getTasks(filteredDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    const { status, search } = filteredDto;
    const query = this.repo.createQueryBuilder('task');
    query.andWhere({ user });

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        `(task.title LIKE :search OR task.description LIKE :search)`, { search: `%${search}%` }
      );
    }
    const tasks = await query.getMany();
    return tasks;
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = {
      title,
      description,
      status: TaskStatus.OPEN,
      user
    }

    const createTask = await this.repo.create(task);
    return this.repo.save(createTask);

  }


  async getTaskById(id: string): Promise<Task> {
    const task = await this.repo.findOne(id);
    if (!task) {
      throw new NotFoundException()
    }
    return task;
  }

  async deleteTask(id: string): Promise<void> {
    const result = await this.repo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException();
    }
  }



  async updateTask(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;
    const result = await this.repo.save(task);
    return result;
  }

}