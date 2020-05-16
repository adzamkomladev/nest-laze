import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import databaseConfig from './config/database.config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, envFilePath: '.dev.env', load: [databaseConfig] })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
