import { TrackerRepository } from "./tracker.repository";
import { CreateSmokingEntryInput } from "./tracker.types";
import { publishEvent } from "../../kafka/producer";
import { getIO } from "../../socket/socket";

export class TrackerService {
  private repo = new TrackerRepository();


  async logCigarette(userId: string, data: CreateSmokingEntryInput) {
  const entry = await this.repo.create(userId, data);

  await publishEvent("cigarette.logged", {
    userId,
    entryId: entry._id,
  });

  const io = getIO();
  io.to(userId).emit("cigaretteLogged", entry);

  return entry;
}

  async getHistory(userId: string, from?: string, to?: string) {
  const fromDate = from ? new Date(from) : undefined;

  let toDate: Date | undefined;

  if (to) {
    toDate = new Date(to);
    toDate.setHours(23, 59, 59, 999); // 🔥 important fix
  }

  return this.repo.findByUser(userId, fromDate, toDate);
}


  async getTodayCount(userId: string) {
    return this.repo.countToday(userId);
  }

  async deleteEntry(entryId: string, userId: string) {
    const deleted = await this.repo.delete(entryId, userId);
    if (!deleted) throw new Error("Entry not found");
    const io = getIO();
    io.to(userId).emit("entryDeleted", entryId);
    return deleted;
  }
}
