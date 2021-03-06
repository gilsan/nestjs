import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";

import { AuthModule } from "./auth/auth.module";
import { TasksModule } from "./tasks/tasks.module";
import { Task } from "./tasks/tasks.entity";


@Module({
  imports: [

    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: 'localhost',
    //   port: 3306,
    //   username: 'wirex',
    //   password: 'wirex',
    //   database: 'users',
    //   entities: [Task],
    //   synchronize: true,
    // }),
    AuthModule,
    TasksModule
  ],
})
export class TaskManagementModule {

}