import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from 'rxjs/operators';
import { UserService } from "./user.service";

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {

  constructor(
    private userService: UserService,
  ) { }

  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    const request = context.switchToHttp().getRequest();
    console.log('[세션][request.session.userId] ==>', request.session.userId);
    const { userId } = request.session.userId || {};

    if (userId) {
      const user = await this.userService.findOne(userId);
      request.currentUser = user;
    }


    return next.handle().pipe();
  }

}