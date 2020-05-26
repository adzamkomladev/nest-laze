import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ChatRepository } from '../repositories/chat.repository';

import { User } from '../../auth/entities/user.entity';
import { Chat } from '../entities/chat.entity';

import { CreateChatDto } from '../dtos/create-chat.dto';

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(ChatRepository)
    private readonly chatRepository: ChatRepository,
  ) {}

  create(createChatDto: CreateChatDto, user: User): Promise<Chat> {
    return this.chatRepository.createChat(createChatDto, user);
  }
}
