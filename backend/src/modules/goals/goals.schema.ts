import { z } from "zod";

export const createGoalSchema = z.object({
  type: z.enum(["gradual", "cold_turkey"]),
  baselinePerDay: z.number().min(1),
  targetPerDay: z.number().optional(),
  targetQuitDate: z.string().transform((val) => new Date(val)),
});
