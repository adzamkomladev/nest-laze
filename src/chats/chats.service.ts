import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ChatRepository } from './repositories/chat.repository';
import { MessageRepository } from './repositories/message.repository';

import { User } from '../auth/user.entity';
import { Chat } from './entities/chat.entity';
import { Message } from './entities/message.entity';

import { CreateChatDto } from './dtos/create-chat.dto';
import { CreateMessageDto } from './dtos/create-message.dto';
import { RoomDto } from './dtos/room.dto';
import { MessageSeenDto } from './dtos/message-seen.dto';

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

  findOneChatById(roomDto: RoomDto): Promise<Chat> {
    const { chatId } = roomDto;

    try {
      return this.chatRepository.findOneOrFail(chatId, {
        relations: ['userOne', 'userTwo', 'messages'],
      });
    } catch (error) {
      throw new NotFoundException(`Chat with id: '${chatId}' not found!`);
    }
  }

  async markMessageAsSeen(messageSeenDto: MessageSeenDto): Promise<Message> {
    const { messageId } = messageSeenDto;

    try {
      const message = await this.messageRepository.findOneOrFail(messageId);

      message.seen = true;

      return await message.save();
    } catch (error) {
      throw new NotFoundException(`Message with id: '${messageId}' not found!`);
    }
  }
}
