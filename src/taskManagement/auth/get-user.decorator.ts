import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User } from "./user.entity";


export const GetUser = createParamDecorator(
  (data: never, ctx: ExecutionContext): User => {
    const req = ctx.switchToHttp().getRequest();
    console.log(req);
    return req.user;
  }
) 