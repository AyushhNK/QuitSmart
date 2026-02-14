import { SmokingEntryModel } from "./tracker.model";
import { CreateSmokingEntryInput } from "./tracker.types";
import mongoose from "mongoose";

export class TrackerRepository {
  async create(userId: string, data: CreateSmokingEntryInput) {
    return SmokingEntryModel.create({
      userId: new mongoose.Types.ObjectId(userId),
      ...data,
    });
  }

  async findByUser(userId: string, from?: Date, to?: Date) {
    const filter: any = { userId };

    if (from || to) {
      filter.timestamp = {};
      if (from) filter.timestamp.$gte = from;
      if (to) filter.timestamp.$lte = to;
    }

    return SmokingEntryModel.find(filter).sort({ timestamp: -1 });
  }

  async countToday(userId: string) {
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    return SmokingEntryModel.countDocuments({
      userId,
      timestamp: { $gte: start, $lte: end },
    });
  }

  async delete(entryId: string, userId: string) {
    return SmokingEntryModel.findOneAndDelete({
      _id: entryId,
      userId,
    });
  }
}
