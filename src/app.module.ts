import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CourseModule } from './courses/courses.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGOOSE_CONNECTION } from './constants';
import { MessagesModule } from './messages/message.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskManagementModule } from './taskManagement/taskmanagement.module';
import { Task } from './taskManagement/tasks/tasks.entity';
import { User } from './taskManagement/auth/user.entity';


@Module({
  imports: [
    CourseModule,
    MongooseModule.forRoot(MONGOOSE_CONNECTION),
    MessagesModule,
    TaskManagementModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'wirex',
      password: 'wirex',
      database: 'users',
      entities: [Task, User],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
