import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Injectable, Logger } from '@nestjs/common';

@WebSocketGateway({ cors: true })
@Injectable()
export class MessageGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(MessageGateway.name);

  // Map userId -> set of socket ids
  private userSockets = new Map<number, Set<string>>();

  handleConnection(client: Socket) {
    try {
      const qs = client.handshake.query || {};
      const uid = qs.userId || qs.user || qs.uid;
      if (!uid) {
        this.logger.debug('Socket connected without userId');
        return;
      }
      const userId = Number(uid);
      const sockets = this.userSockets.get(userId) || new Set<string>();
      sockets.add(client.id);
      this.userSockets.set(userId, sockets);
      this.logger.log(`User ${userId} connected on socket ${client.id}`);
    } catch (err: unknown) {
      this.logger.error('Error in handleConnection', err as Error | string);
    }
  }

  handleDisconnect(client: Socket) {
    try {
      // find and remove socket id from all user sets
      for (const [userId, sockets] of this.userSockets.entries()) {
        if (sockets.has(client.id)) {
          sockets.delete(client.id);
          if (sockets.size === 0) this.userSockets.delete(userId);
          this.logger.log(`User ${userId} disconnected socket ${client.id}`);
          break;
        }
      }
    } catch (err: unknown) {
      this.logger.error('Error in handleDisconnect', err as Error | string);
    }
  }

  /**
   * Send an event payload to a user (all connected sockets)
   */
  sendToUser(userId: number, event: string, payload: unknown) {
    const sockets = this.userSockets.get(userId);
    if (!sockets || sockets.size === 0) return;
    for (const sid of sockets) {
      this.server.to(sid).emit(event, payload);
    }
  }

  /**
   * Broadcast to all connected sockets (optional)
   */
  broadcast(event: string, payload: unknown) {
    this.server.emit(event, payload);
  }
}
