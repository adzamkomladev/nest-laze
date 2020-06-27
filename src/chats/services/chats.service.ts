import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ChatRepository } from '../repositories/chat.repository';
import { MessageRepository } from '../repositories/message.repository';

import { User } from '../../auth/entities/user.entity';
import { Chat } from '../entities/chat.entity';
import { Message } from '../entities/message.entity';

import { CreateChatDto } from '../dtos/create-chat.dto';
import { CreateMessageDto } from '../dtos/create-message.dto';

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(ChatRepository)
    private readonly chatRepository: ChatRepository,
    @InjectRepository(MessageRepository)
    private readonly messageRepository: MessageRepository,
  ) {}

  create(createChatDto: CreateChatDto, user: User): Promise<Chat> {
    return this.chatRepository.createChat(createChatDto, user);
  }

  createMessage(
    createMessageDto: CreateMessageDto,
    user: User,
  ): Promise<Message> {
    return this.messageRepository.createMessage(createMessageDto, user.id);
  }
}
