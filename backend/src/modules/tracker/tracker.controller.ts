import { Request, Response, NextFunction } from "express";
import { TrackerService } from "./tracker.service";
import { createSmokingEntrySchema, querySchema } from "./tracker.schema";

const service = new TrackerService();

export class TrackerController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user.id; // from auth middleware
      const data = createSmokingEntrySchema.parse(req.body);

      const entry = await service.logCigarette(userId, data);

      res.status(201).json({
        message: "Cigarette logged",
        data: entry,
      });
    } catch (error) {
      next(error);
    }
  }

  async history(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user.id;
      const { from, to } = querySchema.parse(req.query);

      const entries = await service.getHistory(userId, from, to);

      res.json(entries);
    } catch (error) {
      next(error);
    }
  }

  async todayCount(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user.id;

      const count = await service.getTodayCount(userId);

      res.json({ todayCount: count });
    } catch (error) {
      next(error);
    }
  }

  async delete(
    req: Request<{ id: string }>,
     res: Response,
      next: NextFunction) {
    try {
      const userId = req.user.id;
      const { id } = req.params;

      await service.deleteEntry(id, userId);

      res.json({ message: "Entry deleted" });
    } catch (error) {
      next(error);
    }
  }
}
