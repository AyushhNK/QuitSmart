import mongoose, { Document, Schema } from "mongoose";

export interface SmokingEntryDocument extends Document {
  userId: mongoose.Types.ObjectId;
  timestamp: Date;
  trigger?: string;
  mood?: string;
  location?: string;
  note?: string;
  createdAt: Date;
  updatedAt: Date;
}

const trackerSchema = new Schema<SmokingEntryDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    trigger: String,
    mood: String,
    location: String,
    note: String,
  },
  { timestamps: true }
);

export const SmokingEntryModel = mongoose.model<SmokingEntryDocument>(
  "SmokingEntry",
  trackerSchema
);
