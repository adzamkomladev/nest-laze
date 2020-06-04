import { EntityRepository, Repository } from 'typeorm';

import { Message } from '../entities/message.entity';
import { User } from '../../auth/entities/user.entity';

import { CreateMessageDto } from '../dtos/create-message.dto';

@EntityRepository(Message)
export class MessageRepository extends Repository<Message> {
  createMessage(
    createMessageDto: CreateMessageDto,
    user: User,
  ): Promise<Message> {
    const { chatId, text } = createMessageDto;

    const message = this.create();

    message.senderId = user.id;
    message.chatId = chatId;
    message.text = text;

    return message.save();
  }
}
