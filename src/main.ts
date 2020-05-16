import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import applicationConfig from './config/appliation.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(applicationConfig().port);
}

bootstrap();
