export type GoalType = "gradual" | "cold_turkey";

export interface CreateGoalInput {
  type: GoalType;
  baselinePerDay: number;
  targetPerDay?: number; // for gradual
  targetQuitDate: Date;
}
