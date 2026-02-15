import mongoose from "mongoose";
import { NotificationModel } from "./notification.model";
import { CreateNotificationInput } from "./notification.types";

export class NotificationRepository {

  async create(userId: string, data: CreateNotificationInput) {
    return NotificationModel.create({
      userId: new mongoose.Types.ObjectId(userId),
      ...data,
    });
  }

  async findByUser(userId: string) {
    return NotificationModel.find({ userId })
      .sort({ createdAt: -1 });
  }

  async markAsRead(notificationId: string, userId: string) {
    return NotificationModel.findOneAndUpdate(
      { _id: notificationId, userId },
      { isRead: true },
      { new: true }
    );
  }

  async markAllAsRead(userId: string) {
    return NotificationModel.updateMany(
      { userId, isRead: false },
      { isRead: true }
    );
  }

  async delete(notificationId: string, userId: string) {
    return NotificationModel.findOneAndDelete({
      _id: notificationId,
      userId,
    });
  }
}
