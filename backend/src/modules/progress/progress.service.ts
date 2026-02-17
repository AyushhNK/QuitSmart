import mongoose from "mongoose";
import { SmokingEntryModel } from "../tracker/tracker.model";
import { ProgressSummary } from "./progress.types";

export class ProgressService {

  async getSummary(userId: string, baselinePerDay: number, pricePerPack: number) {

    const entries = await SmokingEntryModel
      .find({ userId: new mongoose.Types.ObjectId(userId) })
      .sort({ timestamp: 1 });

    if (entries.length === 0) {
      return {
        todayCount: 0,
        totalCount: 0,
        smokeFreeDays: 0,
        currentStreak: 0,
        moneySaved: 0,
        reductionPercentage: 0
      };
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const totalCount = entries.length;

    const todayCount = entries.filter(e => {
      const d = new Date(e.timestamp);
      return d >= today;
    }).length;

    // 🔥 Group by day
    const groupedByDay = new Map<string, number>();

    entries.forEach(entry => {
      const day = new Date(entry.timestamp).toISOString().split("T")[0];
      groupedByDay.set(day, (groupedByDay.get(day) || 0) + 1);
    });

    // 🔥 Calculate total tracking days
    const firstEntryDate = new Date(entries[0].timestamp);
    firstEntryDate.setHours(0, 0, 0, 0);

    const diffTime = today.getTime() - firstEntryDate.getTime();
    const totalTrackingDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;

    // 🔥 Smoke-free days
    const smokeFreeDays = totalTrackingDays - groupedByDay.size;

    // 🔥 Current streak
    let currentStreak = 0;
    let checkDate = new Date(today);

    while (true) {
      const key = checkDate.toISOString().split("T")[0];

      if (!groupedByDay.has(key)) {
        currentStreak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }

      if (checkDate < firstEntryDate) break;
    }

    // 🔥 Money Saved
    const cigarettesPerPack = 20;
    const costPerCigarette = pricePerPack / cigarettesPerPack;

    const expectedTotal = baselinePerDay * totalTrackingDays;
    const avoidedCigarettes = expectedTotal - totalCount;

    const moneySaved = avoidedCigarettes > 0
      ? avoidedCigarettes * costPerCigarette
      : 0;

    // 🔥 Reduction %
    const reductionPercentage = baselinePerDay
      ? ((baselinePerDay - todayCount) / baselinePerDay) * 100
      : 0;

    return {
      todayCount,
      totalCount,
      smokeFreeDays,
      currentStreak,
      moneySaved: Number(moneySaved.toFixed(2)),
      reductionPercentage: Number(reductionPercentage.toFixed(2))
    } as ProgressSummary;
  }
}
