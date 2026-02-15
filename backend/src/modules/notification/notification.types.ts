export type NotificationType =
  | "goal_reminder"
  | "craving_alert"
  | "milestone"
  | "streak_warning"
  | "achievement";

export interface CreateNotificationInput {
  type: NotificationType;
  title: string;
  message: string;
}
