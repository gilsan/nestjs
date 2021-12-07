import { Module } from "@nestjs/common";
import { ReportsModule } from "./reports/reports.module";
import { UsersModule } from "./users/users.module";
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserList } from "./users/user.entity";
import { Report } from "./reports/report.entity";
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
  imports: [
    UsersModule,
    ReportsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: config.get<string>('USER_NAME'),
          password: config.get<string>('USER_PASSWORD'),
          database: config.get<string>('DB_NAME'),
          // database: 'user',
          entities: [UserList, Report],
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
    //   database: 'user',
    //   entities: [UserList, Report],
    //   synchronize: true,
    // }),
  ],

})
export class MyCVModule {

}