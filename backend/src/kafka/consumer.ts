import { kafka } from "./kafka";
import { NotificationService } from "../modules/notification/notification.service";

const consumer = kafka.consumer({ groupId: "notification-group" });

export const startConsumer = async () => {
  await consumer.connect();

  await consumer.subscribe({
    topic: "cigarette.logged",
    fromBeginning: false,
  });

  await consumer.subscribe({
    topic: "goal.completed",
    fromBeginning: false,
  });

  await consumer.run({
    eachMessage: async ({ topic, message }) => {
      const data = JSON.parse(message.value!.toString());

      const notificationService = new NotificationService();

      if (topic === "cigarette.logged") {
        await notificationService.send(data.userId, {
          type: "craving_alert",
          title: "Stay Strong 💪",
          message: "You logged a cigarette. Keep fighting!",
        });
      }

      if (topic === "goal.completed") {
        await notificationService.send(data.userId, {
          type: "achievement",
          title: "Goal Completed 🎉",
          message: "Congratulations on completing your goal!",
        });
      }
    },
  });
};
