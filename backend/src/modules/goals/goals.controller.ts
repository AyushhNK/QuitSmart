import { Request, Response, NextFunction } from "express";
import { GoalsService } from "./goals.service";
import { createGoalSchema } from "./goals.schema";

const service = new GoalsService();

export class GoalsController {

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user.userId;
      console.log("Creating goal for user:", userId, "with data:", req.body);

      const data = createGoalSchema.parse(req.body);

      const goal = await service.createGoal(userId, data);

      res.status(201).json(goal);
    } catch (error) {
      next(error);
    }
  }

  async getActive(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user.userId;

      const goal = await service.getActiveGoal(userId);

      res.json(goal);
    } catch (error) {
      next(error);
    }
  }

  async complete(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user.userId;

      const goal = await service.completeGoal(userId);

      res.json(goal);
    } catch (error) {
      next(error);
    }
  }

  async delete(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = req.user.userId;
      const { id } = req.params;

      await service.deleteGoal(userId, id);

      res.json({ message: "Goal deleted" });
    } catch (error) {
      next(error);
    }
  }
}
