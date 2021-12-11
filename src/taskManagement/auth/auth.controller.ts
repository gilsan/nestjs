import { Controller, Body, Get, Post, Delete, Patch, Query, Param, } from "@nestjs/common";
import { Serialize, SerializeInterceptor } from "../interceptors/serialize.interceptor";
import { AuthService } from "./auth.service";
import { AuthCredentialsDto, UserDto } from "./dtos/auth.dto";
import { UserList } from "./models/jwt-payload.interface";

@Controller('/auth')
export class AuthController {
  constructor(
    private authService: AuthService
  ) { }

  @Serialize(UserDto)
  @Get('/showAll')
  findAll(): Promise<UserList[]> {
    return this.authService.findAll();
  }

  @Post('/signup')
  signup(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }


  @Post('/signin')
  signin(@Body() authCredentialsDto: AuthCredentialsDto): Promise<string> {
    return this.authService.signIn(authCredentialsDto);
  }






}