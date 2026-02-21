import { NotificationRepository } from "./notification.repository";
import { CreateNotificationInput } from "./notification.types";
import { getIO } from "../../socket/socket";

export class NotificationService {

  private repo = new NotificationRepository();

  async send(userId: string, data: CreateNotificationInput) {
    const notification = await this.repo.create(userId, data);
    const io = getIO();
    io.to(userId).emit("notification", notification);
    return notification;
  }

  async getUserNotifications(userId: string) {
    return this.repo.findByUser(userId);
  }

  async markAsRead(notificationId: string, userId: string) {
    const updated = await this.repo.markAsRead(notificationId, userId);
    if (!updated) throw new Error("Notification not found");
    const io = getIO();
    io.to(userId).emit("notificationRead", notificationId);
    return updated;
  }

  async markAllAsRead(userId: string) {
    const updated = await this.repo.markAllAsRead(userId);
    const io = getIO();
    io.to(userId).emit("allNotificationsRead");
    return updated;
  }

  async delete(notificationId: string, userId: string) {
    const deleted = await this.repo.delete(notificationId, userId);
    if (!deleted) throw new Error("Notification not found");
    const io = getIO();
    io.to(userId).emit("notificationDeleted", notificationId);
    return deleted;
  }

  private messages = [
    "You usually smoke around this time. Try a 5-minute breathing exercise now.",
    "Craving alert! Take a short walk instead of smoking.",
    "Feeling the urge? Drink a glass of water and breathe deeply.",
    "Time for your usual smoke? Try stretching for 5 minutes instead.",
    "Notice the craving? Listen to a favorite song or meditate for a bit.",
    "Your peak smoking time! Challenge yourself: skip it and do a quick exercise."
  ];

  async sendPreCravingNotification(userId: string) {
    // Pick a random message
    const randomIndex = Math.floor(Math.random() * this.messages.length);
    const message = this.messages[randomIndex];

    console.log(`Sending craving alert to ${userId}: "${message}"`);

    // Send via socket
    const io = getIO();
    io.to(userId).emit("preCravingAlert", { message, timestamp: new Date() });

  }
}
