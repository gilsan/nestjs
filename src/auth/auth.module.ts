import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthController } from "./controllers/auth.controller";
import { AuthRepository } from "./repositories/auth.repository";

import { UserSchema } from "./schema/auth.schema";


@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'topSecrete51',
      signOptions: {
        expiresIn: 3600,
      }
    }),
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema }
    ])
  ],
  controllers: [
    AuthController
  ],
  providers: [
    AuthRepository
  ]
})
export class AuthModule {

}