import { EntityRepository, Repository } from 'typeorm';
import { Chat } from '../entities/chat.entity';
import { CreateChatDto } from '../dtos/create-chat.dto';
import { User } from '../../auth/user.entity';
import { Status } from '../../projects/enums/status.enum';

@EntityRepository(Chat)
export class ChatRepository extends Repository<Chat> {
  createChat(createChatDto: CreateChatDto, user: User): Promise<Chat> {
    const { userTwoId } = createChatDto;

    const chat = this.create();

    chat.userOneId = user.id;
    chat.userTwoId = userTwoId;

    return chat.save();
  }
}
