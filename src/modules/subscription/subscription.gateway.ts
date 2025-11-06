import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  namespace: '/subscriptions',
  cors: { origin: '*' },
})
export class SubscriptionGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger = new Logger(SubscriptionGateway.name);
  constructor() {}

  @WebSocketServer()
  server!: Server;

  private connectedUsers = new Map<string, string>(); // userId -> socketId

  afterInit() {
    this.logger.log('✅ SubscriptionGateway initialized');
  }

  handleConnection(client: Socket) {
    const userId = client.handshake.query.userId as string;

    if (userId) {
      this.connectedUsers.set(userId, client.id);
      this.logger.log(`🟢 User ${userId} connected (${client.id})`);
    } else {
      this.logger.warn(`⚠️ Client ${client.id} connected without userId`);
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

  // == Send payment success notification to a specific user ==
  sendPaymentSuccessToUser<T>(userId: string, paymentInfo: T) {
    const socketId = this.connectedUsers.get(userId);
    if (socketId) {
      this.server.to(socketId).emit('paymentSuccess', {
        message: 'Payment successful!',
        data: paymentInfo,
      });
      this.logger.log(`💰 Sent paymentSuccess to user ${userId}`);
    } else {
      this.logger.warn(`⚠️ No active socket for user ${userId}`);
    }
  }

  // === Payment Success Broadcast ===
  sendPaymentSuccess<T>(userId: string, paymentInfo: T) {
    this.sendPaymentSuccessToUser(userId, paymentInfo);
  }
}
