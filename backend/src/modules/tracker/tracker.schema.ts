import { z } from "zod";

export const createSmokingEntrySchema = z.object({
  trigger: z.string().optional(),
  mood: z.string().optional(),
  location: z.string().optional(),
  note: z.string().optional(),
});

export const querySchema = z.object({
  from: z.string().optional(),
  to: z.string().optional(),
});
