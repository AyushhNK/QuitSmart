// src/modules/prediction/smoking.repository.ts
import { SmokingEntryModel } from "../tracker/tracker.model";
import { SmokingLog } from "./smoking.types";

export class SmokingRepository {

    async getAllUserIds(): Promise<string[]> {
    const ids = await SmokingEntryModel.distinct("userId");
    return ids.map((id) => id.toString());
  }
 
  async getUserLogs(userId: string): Promise<SmokingLog[]> {
    const docs = await SmokingEntryModel.find({ userId })
      .sort({ timestamp: 1 }) 
      .lean();

    return docs.map((doc) => ({
      userId: doc.userId.toString(), 
      timestamp: doc.timestamp,
      mood: doc.mood,
      trigger: doc.trigger,
    }));
  }
}