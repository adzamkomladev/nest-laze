import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Logger, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { Server, Socket } from 'socket.io';

import { ChatsService } from '../services/chats.service';
import { AuthService } from '../../auth/services/auth.service';

import { CreateMessageDto } from '../dtos/create-message.dto';
import { GetUser } from '../../auth/decorators/get-user.decorator';
import { User } from '../../auth/entities/user.entity';

@WebSocketGateway()
@UseGuards(AuthGuard())
export class ChatsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger: Logger;

  @WebSocketServer() server: Server;

  constructor(
    private readonly chatsService: ChatsService,
    private readonly authService: AuthService,
  ) {
    this.logger = new Logger(ChatsGateway.name);
  }

  @SubscribeMessage('messageToServer')
  async handleMessage(
    client: Socket,
    payload: CreateMessageDto,
  ): Promise<void> {
    this.logger.log({ payload });

    //const message = await this.chatsService.createMessage(payload, user);

    this.server.emit('messageToClient', {});
  }

  afterInit(server: Server): void {
    this.logger.log('Init');
  }

  handleDisconnect(client: Socket): void {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]): void {
    this.logger.log(`Client connected: ${client.id}`);
  }
}
