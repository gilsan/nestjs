import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";

import { AuthModule } from "./auth/auth.module";
import { TasksModule } from "./tasks/tasks.module";
import { TasksEntity } from "./tasks/tasks.entity";


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: false
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'wirex',
          password: 'wirex',
          database: 'users',
          entities: [TasksEntity],
          synchronize: true,
        }
      }
    }),
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: 'localhost',
    //   port: 3306,
    //   username: 'wirex',
    //   password: 'wirex',
    //   database: 'users',
    //   entities: [TaskEntity],
    //   synchronize: true,
    // }),
    AuthModule,
    TasksModule
  ],
})
export class TaskManagementModule {

}