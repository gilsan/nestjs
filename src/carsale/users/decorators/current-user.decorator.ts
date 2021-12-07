import { createParamDecorator, ExecutionContext, NestInterceptor, CallHandler } from "@nestjs/common";
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export const CurrentUser = createParamDecorator(
  (data: any, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.currentUser;
  }
);