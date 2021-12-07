import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";


export class HttpExceptionFilter implements ExceptionFilter {

  catch(exception: HttpException, host: ArgumentsHost) {
    console.log('HTTP exception handler triggered', JSON.stringify(exception));

    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const statusCode = exception.getStatus();

    return response.status(statusCode).json({
      status: statusCode,
      createdBy: "HttpExceptionFilter",
      errorMessage: exception.message
    });
  }

}


@Catch()
export class FallbackExceptionFilter implements ExceptionFilter {


  catch(exception: HttpException, host: ArgumentsHost) {
    console.log('HTTP exception handler triggered', JSON.stringify(exception));

    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const statusCode = exception.getStatus();

    return response.status(500).json({
      status: statusCode,
      createdBy: "FallbackExceptionFilter",
      errorMessage: exception.message
    });
  }

}


