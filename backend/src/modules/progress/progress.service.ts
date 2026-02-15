import { SmokingEntryModel } from "../tracker/tracker.model";
import { ProgressSummary } from "./progress.types";

export class ProgressService {

  async getSummary(userId: string, baselinePerDay: number, pricePerPack: number) {
    const entries = await SmokingEntryModel.find({ userId }).sort({ timestamp: 1 });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayEntries = entries.filter(e => {
      const d = new Date(e.timestamp);
      return d >= today;
    });

    const totalCount = entries.length;
    const todayCount = todayEntries.length;

    // 🔥 Smoke-free days
    const groupedByDay = new Map<string, number>();

    entries.forEach(entry => {
      const day = new Date(entry.timestamp).toISOString().split("T")[0];
      groupedByDay.set(day, (groupedByDay.get(day) || 0) + 1);
    });

    let smokeFreeDays = 0;
    groupedByDay.forEach(count => {
      if (count === 0) smokeFreeDays++;
    });

    // 🔥 Current Streak
    let currentStreak = 0;
    let checkDate = new Date();
    checkDate.setHours(0, 0, 0, 0);

    while (true) {
      const key = checkDate.toISOString().split("T")[0];
      const count = groupedByDay.get(key);

      if (!count) {
        currentStreak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }

    // 🔥 Money Saved
    const cigarettesPerPack = 20;
    const costPerCigarette = pricePerPack / cigarettesPerPack;

    const expectedTotal = baselinePerDay * groupedByDay.size;
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
