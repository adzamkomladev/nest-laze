import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Logger, UseGuards } from '@nestjs/common';

import { Server, Socket } from 'socket.io';

import { WsAuthGuard } from '../auth/guards/ws-auth.guard';

import { ChatsService } from './chats.service';

import { User } from '../auth/user.entity';

import { CreateMessageDto } from './dtos/create-message.dto';
import { RoomDto } from './dtos/room.dto';
import { MessageSeenDto } from './dtos/message-seen.dto';

@WebSocketGateway()
@UseGuards(WsAuthGuard)
export class ChatsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  private readonly logger: Logger;

  constructor(private readonly chatsService: ChatsService) {
    this.logger = new Logger(ChatsGateway.name);
  }

  @SubscribeMessage('messageToServer')
  async handleMessage(
    client: Socket,
    payload: CreateMessageDto,
  ): Promise<void> {
    const user: User = (client?.handshake as any)?.user;

    const message = await this.chatsService.createMessage(payload, user);

    this.server.to(String(payload?.chatId)).emit('messageToClient', message);
  }

  @SubscribeMessage('joinRoom')
  async handleJoinRoom(client: Socket, payload: RoomDto): Promise<void> {
    const user: User = (client?.handshake as any)?.user;

    try {
      const chat = await this.chatsService.findOneChatById(payload);

      client.join(String(payload.chatId));

      this.server.emit(`joinRoom${user.id}`, chat);
    } catch (error) {
      throw new WsException(error?.message);
    }
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(client: Socket, payload: RoomDto): void {
    const user: User = (client?.handshake as any)?.user;

    client.leave(String(payload.chatId));

    this.server.emit(`leaveRoom${user.id}`, payload);
  }

  @SubscribeMessage('messageSeen')
  async handleMessageSeen(
    client: Socket,
    payload: MessageSeenDto,
  ): Promise<void> {
    try {
      const message = await this.chatsService.markMessageAsSeen(payload);

      this.server.emit('messageSeen', message);
    } catch (error) {
      throw new WsException(error?.message);
    }
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
