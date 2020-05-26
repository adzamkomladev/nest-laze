import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';

import { ChatsController } from './chats.controller';

import { ChatsGateway } from './gateways/chats.gateway';

import { ChatsService } from './services/chats.service';

import { ChatRepository } from './repositories/chat.repository';
import { MessageRepository } from './repositories/message.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChatRepository, MessageRepository]),
    AuthModule,
  ],
  providers: [ChatsGateway, ChatsService],
  controllers: [ChatsController],
})
export class ChatsModule {}
