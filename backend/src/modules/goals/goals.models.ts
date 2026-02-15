import mongoose, { Document, Schema } from "mongoose";
import { GoalType } from "./goals.types";

export interface GoalDocument extends Document {
  userId: mongoose.Types.ObjectId;
  type: GoalType;
  baselinePerDay: number;
  targetPerDay?: number;
  targetQuitDate: Date;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const goalSchema = new Schema<GoalDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: ["gradual", "cold_turkey"],
      required: true,
    },
    baselinePerDay: {
      type: Number,
      required: true,
    },
    targetPerDay: {
      type: Number,
    },
    targetQuitDate: {
      type: Date,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const GoalModel = mongoose.model<GoalDocument>("Goal", goalSchema);
