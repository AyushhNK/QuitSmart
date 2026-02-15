import { NotificationRepository } from "./notification.repository";
import { CreateNotificationInput } from "./notification.types";

export class NotificationService {

  private repo = new NotificationRepository();

  async send(userId: string, data: CreateNotificationInput) {
    const notification = await this.repo.create(userId, data);

    // 🔥 Future: push to email/queue
    // await notificationQueue.add("send-email", { userId, ...data });

    return notification;
  }

  async getUserNotifications(userId: string) {
    return this.repo.findByUser(userId);
  }

  async markAsRead(notificationId: string, userId: string) {
    const updated = await this.repo.markAsRead(notificationId, userId);
    if (!updated) throw new Error("Notification not found");
    return updated;
  }

  async markAllAsRead(userId: string) {
    return this.repo.markAllAsRead(userId);
  }

  async delete(notificationId: string, userId: string) {
    const deleted = await this.repo.delete(notificationId, userId);
    if (!deleted) throw new Error("Notification not found");
    return deleted;
  }
}
