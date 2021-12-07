import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from "./auth.service";
import { CurrentUserInterceptor } from "./current-user.interceptor";
import { UserController } from "./user.controller";
import { UserList } from "./user.entity";
import { UserService } from "./user.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserList])
  ],
  controllers: [
    UserController
  ],
  providers: [
    UserService, AuthService, CurrentUserInterceptor
  ],
})
export class UsersModule {

}