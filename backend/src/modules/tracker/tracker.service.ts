import { TrackerRepository } from "./tracker.repository";
import { CreateSmokingEntryInput } from "./tracker.types";

export class TrackerService {
  private repo = new TrackerRepository();

  async logCigarette(userId: string, data: CreateSmokingEntryInput) {
    return this.repo.create(userId, data);
  }

  async getHistory(userId: string, from?: string, to?: string) {
    const fromDate = from ? new Date(from) : undefined;
    const toDate = to ? new Date(to) : undefined;

    return this.repo.findByUser(userId, fromDate, toDate);
  }

  async getTodayCount(userId: string) {
    return this.repo.countToday(userId);
  }

  async deleteEntry(entryId: string, userId: string) {
    const deleted = await this.repo.delete(entryId, userId);
    if (!deleted) throw new Error("Entry not found");
    return deleted;
  }
}
