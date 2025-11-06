import { Global, Injectable, Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@Global()
@Injectable()
@WebSocketGateway({ namespace: 'notifications', cors: { origin: '*' } })
export class NotificationGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger = new Logger(NotificationGateway.name);

  @WebSocketServer()
  server!: Server;

  private connectedUsers = new Map<string, string>(); // userId → socketId

  afterInit() {
    this.logger.log('✅ Global NotificationGateway initialized');
  }

  handleConnection(client: Socket) {
    const userId = client.handshake.query.userId as string;

    if (userId) {
      this.connectedUsers.set(userId, client.id);
      this.logger.log(`🟢 User ${userId} connected (${client.id})`);
    } else {
      this.logger.warn(`⚠️ Anonymous client connected (${client.id})`);
    }
  }

  handleDisconnect(client: Socket) {
    for (const [userId, socketId] of this.connectedUsers.entries()) {
      if (socketId === client.id) {
        this.connectedUsers.delete(userId);
        this.logger.log(`🔴 User ${userId} disconnected`);
        break;
      }
    }
  }

  // === Emit to all connected clients ===
  broadcast(event: string, data: any) {
    this.server.emit(event, data);
    this.logger.log(`📢 Broadcast event: ${event}`);
  }

  // == emit to admin ==
  sendNotificationToAdmin(event: string, data: any) {
    this.server.emit(event, data);
  }

  // === Emit to specific user ===
  emitToUser(userId: string, event: string, data: any) {
    const socketId = this.connectedUsers.get(userId);
    if (socketId) {
      this.server.to(socketId).emit(event, data);
      this.logger.log(`📩 Sent event "${event}" to user ${userId}`);
    } else {
      this.logger.warn(`⚠️ User ${userId} not connected`);
    }
  }
}
