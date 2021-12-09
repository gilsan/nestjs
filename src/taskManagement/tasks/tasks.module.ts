import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TasksController } from "./tasks.controller";
// import { TasksEntity } from "./tasks.entity";
import { TasksRepository } from "./tasks.repository";
import { TasksService } from "./tasks.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([TasksRepository])
  ],

  controllers: [
    TasksController
  ],
  providers: [
    TasksService
  ]
})
export class TasksModule {

}