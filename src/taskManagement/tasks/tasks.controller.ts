import {
  Controller, Body, Get, Post, Delete, Query, Param, Patch,
  NotFoundException
} from "@nestjs/common";
import { CreateTaskDto } from "./dtos/tasks.dto";
import { Task, TaskStatus } from "./model/task.model";
import { TasksService } from "./tasks.service";


@Controller('/tasks')
export class TasksController {

  constructor(
    private tasksService: TasksService
  ) { }

  @Get()
  getAllTasks() {
    return this.tasksService.getAllTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    const task = this.tasksService.getTaskById(id);
    if (!task) {
      throw new NotFoundException(`NOK`);
    }
    return task;
  }

  @Post()
  createTasks(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.createTask(createTaskDto);
  }

  @Delete('/:id')
  deleteTasks(@Param('id') id: string) {
    return this.tasksService.deleteTask(id)
  }

  @Patch()
  updateTasks(@Body('status') status: TaskStatus, @Query('id') id: string) {
    return this.tasksService.updateTask(id, status)
  }




}