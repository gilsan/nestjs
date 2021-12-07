import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FallbackExceptionFilter } from './courses/controllers/filters/http.filter';

const cookieSession = require('cookie-session');
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieSession({
    keys: ['asdfg']
  }))
  app.enableCors();
  // app.useGlobalFilters(
  //   new FallbackExceptionFilter()
  // )
  await app.listen(9000);
}
bootstrap();
