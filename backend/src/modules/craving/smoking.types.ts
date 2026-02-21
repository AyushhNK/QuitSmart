export interface SmokingLog {
  userId: string;
  timestamp: Date;
  mood?: string;
  trigger?: string;
}