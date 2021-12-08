import { Controller, Get, Post, Delete, Patch, Query, Param } from "@nestjs/common";
import { AuthService } from "./auth.service";


@Controller('/auth')
export class AuthController {
  constructor(
    private authService: AuthService
  ) { }

  @Post('/signup')
  signup() { }


  @Post('/signin')
  signin() { }






}