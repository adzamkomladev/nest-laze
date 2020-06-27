import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Logger, UseGuards } from '@nestjs/common';

import { Server, Socket } from 'socket.io';

import { WsAuthGuard } from '../../auth/guards/ws-auth.guard';

import { ChatsService } from '../services/chats.service';
import { AuthService } from '../../auth/services/auth.service';

import { User } from '../../auth/entities/user.entity';

import { CreateMessageDto } from '../dtos/create-message.dto';

@WebSocketGateway()
@UseGuards(WsAuthGuard)
export class ChatsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  private readonly logger: Logger;

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
    const user: User = (client?.handshake as any)?.user;

    this.logger.log({ dome: 1234, payload, user });

    //const message = await this.chatsService.createMessage(payload, user);

    this.server.emit('messageToClient', payload);
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
