import { Body, Controller, Post } from "@nestjs/common";
import { AuthRepository } from "../repositories/auth.repository";


@Controller("/auth")
export class AuthController {

  constructor(
    private authService: AuthRepository
  ) { }

  @Post('/login')
  login(@Body('email') email: string, @Body('password') plainedPassword: string) {

    return this.authService.login(email, plainedPassword)
  }

}