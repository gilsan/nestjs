import { IsEnum, IsOptional, IsString } from "class-validator";
import { TaskStatus } from "../model/task.model";


export class CreateTaskDto {
  @IsString()
  title: string;

  @IsString()
  description: string;
}

export class UpdateTaskDto {
  @IsEnum(TaskStatus)
  status: TaskStatus
}

export class GetTasksFilterDto {

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsString()
  search?: string;
}