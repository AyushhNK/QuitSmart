import cron from "node-cron";
import { CravingPredictionService } from "./prediction.service";
import { SmokingRepository } from "./craving.repository";
import { NotificationService } from "../notification/notification.service";
import logger from "../../utils/logger";

const predictionService = new CravingPredictionService();
const notificationService = new NotificationService();
const smokingRepository = new SmokingRepository();

export const startCravingScheduler = () => {
  logger.info("Starting Craving Scheduler...");

  cron.schedule("*/5 * * * *", async () => {
    try {
      // Fetch all users who have logged smoking events
      const users: string[] = await smokingRepository.getAllUserIds();

      for (const userId of users) {
        // Fetch user logs from repository (already type-safe)
        const logs = await smokingRepository.getUserLogs(userId);

        if (!logs.length) continue;

        // Predict peak smoking hour
        const peakHour = predictionService.predictTopCravingHour(logs);

        const now = new Date();
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();

        // 15 minutes before predicted peak hour
        if (currentHour === peakHour && currentMinute === 45) {
          logger.info(`Sending pre-craving notification to user: ${userId}`);
          await notificationService.sendPreCravingNotification(userId);
        }
      }
    } catch (error) {
      logger.error("Craving scheduler error:", error);
    }
  });
};