import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { User } from "./user.entity";
import { JwtStrategy } from "./jwt.strategy";


@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'topSecrete51',
      signOptions: {
        expiresIn: 3600,
      }
    }),
  ],
  controllers: [
    AuthController
  ],
  providers: [
    AuthService, JwtStrategy
  ],
  exports: [
    PassportModule, JwtStrategy
  ]
})
export class AuthModule {

}