import { Controller, Body, Get, Post, Delete, Patch, Query, Param } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthCredentialsDto } from "./dtos/auth.dto";


@Controller('/auth')
export class AuthController {
  constructor(
    private authService: AuthService
  ) { }

  @Post('/signup')
  signup(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }


  @Post('/signin')
  signin(@Body() authCredentialsDto: AuthCredentialsDto): Promise<string> {
    return this.authService.signIn(authCredentialsDto);
  }






}