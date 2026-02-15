import { Request, Response, NextFunction } from "express";
import { ProgressService } from "./progress.service";

const service = new ProgressService();

export class ProgressController {

  async summary(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user.id;

      // Ideally fetched from user profile
      const baselinePerDay = Number(req.query.baseline || 10);
      const pricePerPack = Number(req.query.price || 5);

      const summary = await service.getSummary(
        userId,
        baselinePerDay,
        pricePerPack
      );

      res.json(summary);
    } catch (error) {
      next(error);
    }
  }
}
