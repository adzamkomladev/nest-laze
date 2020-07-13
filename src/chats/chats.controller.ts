import {
  Body,
  Controller,
  Logger,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ChatsService } from './chats.service';

import { Chat } from './entities/chat.entity';
import { User } from '../auth/user.entity';

import { CreateChatDto } from './dtos/create-chat.dto';

import { GetUser } from '../auth/decorators/get-user.decorator';

@Controller('chats')
@UseGuards(AuthGuard())
export class ChatsController {
  private readonly logger: Logger;

  constructor(private readonly chatsService: ChatsService) {
    this.logger = new Logger(ChatsController.name);
  }

  @Post()
  create(
    @Body(ValidationPipe) body: CreateChatDto,
    @GetUser() user: User,
  ): Promise<Chat> {
    this.logger.log({ body, user });

    return this.chatsService.create(body, user);
  }
}
