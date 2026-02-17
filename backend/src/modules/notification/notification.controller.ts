import { Request, Response, NextFunction } from "express";
import { NotificationService } from "./notification.service";

const service = new NotificationService();

export class NotificationController {

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user.userId;

      const notifications = await service.getUserNotifications(userId);

      res.json(notifications);
    } catch (error) {
      next(error);
    }
  }

  async markAsRead(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = req.user.userId;
      const { id } = req.params;

      const notification = await service.markAsRead(id, userId);

      res.json(notification);
    } catch (error) {
      next(error);
    }
  }

  async markAll(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user.userId;

      await service.markAllAsRead(userId);

      res.json({ message: "All notifications marked as read" });
    } catch (error) {
      next(error);
    }
  }

  async delete(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = req.user.userId;
      const { id } = req.params;

      await service.delete(id, userId);

      res.json({ message: "Notification deleted" });
    } catch (error) {
      next(error);
    }
  }
}
