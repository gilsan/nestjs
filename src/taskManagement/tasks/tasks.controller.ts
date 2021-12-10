import {
  Controller, Body, Get, Post, Delete, Query, Param, Patch,
  NotFoundException,
  UseGuards
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CreateTaskDto, GetTasksFilterDto } from "./dtos/tasks.dto";
import { Task, TaskStatus } from "./model/task.model";
import { TasksService } from "./tasks.service";


@Controller('/tasks')
@UseGuards(AuthGuard())
export class TasksController {

  constructor(
    private tasksService: TasksService
  ) { }

  // @Get()
  // getAllTasks(): Promise<Task[]> {
  //   return this.tasksService.getAllTasks();
  // }

  @Get()
  getTasks(@Query() filteredDto: GetTasksFilterDto): Promise<Task[]> {
    return this.tasksService.getTasks(filteredDto);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    const task = this.tasksService.getTaskById(id);
    if (!task) {
      throw new NotFoundException(`NOK`);
    }
    return task;
  }

  @Post()
  createTasks(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }

  @Delete('/:id')
  deleteTasks(@Param('id') id: string) {
    return this.tasksService.deleteTask(id)
  }

  @Patch()
  updateTasks(@Body('status') status: TaskStatus, @Query('id') id: string): Promise<Task> {
    return this.tasksService.updateTask(id, status)
  }




}