import { Injectable, Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  namespace: '/chat',
  cors: { origin: '*' },
  transport: ['websocket', 'polling'],
})
@Injectable()
export class MessageGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(MessageGateway.name);

  // Track sockets per user
  private userSockets = new Map<number, Set<string>>();

  // Currently online users
  private onlineUsers = new Set<number>();

  // Pending offline timers (grace period)
  private offlineTimers = new Map<number, NodeJS.Timeout>();

  // Last seen timestamps for offline users
  private lastSeenMap = new Map<number, Date>();

  private readonly OFFLINE_GRACE_PERIOD = 30_000; // 30 seconds

  afterInit() {
    this.logger.log('MessageGateway initialized');
  }

  handleConnection(client: Socket) {
    try {
      const uid = client.handshake.query?.userId as string;
      if (!uid || isNaN(Number(uid))) {
        client.disconnect();
        return;
      }

      const userId = Number(uid);

      // Cancel any pending offline timer (user came back fast)
      if (this.offlineTimers.has(userId)) {
        clearTimeout(this.offlineTimers.get(userId));
        this.offlineTimers.delete(userId);
        this.logger.log(
          `Reconnected fast → cancelled offline timer for ${userId}`,
        );
      }

      // Track socket
      const sockets = this.userSockets.get(userId) || new Set<string>();
      sockets.add(client.id);
      this.userSockets.set(userId, sockets);

      // Mark online
      const wasOffline = !this.onlineUsers.has(userId);
      this.onlineUsers.add(userId);

      if (wasOffline) {
        this.lastSeenMap.delete(userId); // clear last seen when back online
        this.server.emit('user:status:update', {
          userId,
          isOnline: true,
          lastSeenAt: null,
        });
        this.logger.log(`User ${userId} is ONLINE`);
      }

      // Send full current state to this client
      client.emit('user:status:init', {
        onlineUsers: Array.from(this.onlineUsers),
        lastSeen: Object.fromEntries(
          Array.from(this.lastSeenMap.entries()).map(([id, date]) => [
            id,
            date.toISOString(),
          ]),
        ),
      });
    } catch (err) {
      this.logger.error('handleConnection error', err);
    }
  }

  handleDisconnect(client: Socket) {
    try {
      for (const [userId, sockets] of this.userSockets.entries()) {
        if (sockets.has(client.id)) {
          sockets.delete(client.id);

          if (sockets.size === 0) {
            this.userSockets.delete(userId);

            // Start 30-second grace period
            const timer = setTimeout(() => {
              this.onlineUsers.delete(userId);
              this.offlineTimers.delete(userId);

              const now = new Date();
              this.lastSeenMap.set(userId, now);

              this.server.emit('user:status:update', {
                userId,
                isOnline: false,
                lastSeenAt: now.toISOString(),
              });

              this.logger.log(
                `User ${userId} OFFLINE → last seen: ${now.toISOString()}`,
              );
            }, this.OFFLINE_GRACE_PERIOD);

            this.offlineTimers.set(userId, timer);
            this.logger.log(
              `User ${userId} disconnected → 30s grace period started`,
            );
          }
          break;
        }
      }
    } catch (err) {
      this.logger.error('handleDisconnect error', err);
    }
  }

  sendToUser(userId: number, event: string, payload: any) {
    const sockets = this.userSockets.get(userId);
    if (!sockets?.size) return;
    for (const sid of sockets) {
      this.server.to(sid).emit(event, payload);
    }
  }

  broadcast(event: string, payload: unknown) {
    this.server.emit(event, payload);
  }
}
