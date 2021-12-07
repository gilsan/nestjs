import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CourseModule } from './courses/courses.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGOOSE_CONNECTION } from './constants';
import { AuthModule } from './auth/auth.module';
import { MessagesModule } from './messages/message.module';
import { MyCVModule } from './carsale/mycv.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserList } from './carsale/users/user.entity';
import { Report } from './carsale/reports/report.entity';


@Module({
  imports: [
    CourseModule,
    AuthModule,
    MongooseModule.forRoot(MONGOOSE_CONNECTION),
    MessagesModule,
    MyCVModule,
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: 'localhost',
    //   port: 3306,
    //   username: 'wirex',
    //   password: 'wirex',
    //   database: 'user',
    //   entities: [UserList, Report],
    //   synchronize: false,
    // }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }