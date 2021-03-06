import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
// import { NestExpressApplication } from '@nestjs/platform-express';
//
// import { join } from 'path';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  // const app = await NestFactory.create<NestExpressApplication>(AppModule, {
  //   cors: true,
  // });
  const configService = app.get(ConfigService);

  app.setGlobalPrefix(configService.get<string>('app.version'));

  // app.useStaticAssets(join(__dirname, '..', 'static'));

  await app.listen(configService.get<number>('app.port'));
}

bootstrap();
