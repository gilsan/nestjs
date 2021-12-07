import {
  Controller, Post, Get, Patch, Body, Query, Param, Delete,
  NotFoundException, UseInterceptors, Session
} from "@nestjs/common";
import { SerializeInterceptor, Serialize } from "../interceptors/serialize.interceptor";
import { AuthService } from "./auth.service";
import { CurrentUserInterceptor } from "./current-user.interceptor";
import { CurrentUser } from "./decorators/current-user.decorator";
import { UserDto } from "./dtos/user.dto";
import { UserService } from "./user.service";


@Controller('/auth')
@UseInterceptors(CurrentUserInterceptor)
export class UserController {

  constructor(
    private user: UserService,
    private authService: AuthService
  ) { }

  @Post('/signup')
  async createUser(@Body() body: { email: string, password: string }, @Session() session: any) {
    const user = await this.authService.signup(body.email, body.password);
    session.userId = user.id;
    return user;
    // this.user.create(body.email, body.password);
    // return JSON.stringify({ message: 'OK', email: body.email });
  }

  @Serialize(UserDto)
  @Post('/signin')
  async signIn(@Body() body: { email: string, password: string }, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Get('/whoami')
  async findOne(@CurrentUser() user: string) {
    return user;
  }

  // @UseInterceptors(new SerializeInterceptor(UserDto))
  @Serialize(UserDto)
  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const user = await this.user.findOne(parseInt(id, 10));
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }


  @Get()
  async findUserByEmail(@Query('email') email: string) {
    const user = await this.user.find(email);
    if (!user) {
      throw new NotFoundException('not found user')
    }
    return user;
  }



  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: Partial<{ email: string, password: string }>) {
    return this.user.update(parseInt(id, 10), body);
  }

  @Delete('id')
  removeUser(@Param('id') id: string) {
    return this.user.remove(parseInt(id, 10));
  }

}