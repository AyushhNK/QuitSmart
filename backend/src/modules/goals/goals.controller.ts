import { Request,Response } from "express";
import { GoalsService } from "./goals.service";
import { createGoalSchema } from "./goals.schema";


const service = new GoalsService();

export class GoalsController {
  // Create Goal
  create = async (req: Request, res: Response) => {
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized - No user information",
      });
    }
    const userId = req.user.userId;
    const data = createGoalSchema.parse(req.body);
    const goal = await service.createGoal(userId, data);
    res.status(201).json(goal);
  };

  // Get Active Goal
  getActive = async (req: Request, res: Response) => {
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized - No user information",
      });
    }
    const userId = req.user.userId;
    const goal = await service.getActiveGoal(userId);
    res.json(goal);
  };

  // Complete Goal
  complete = async (req: Request, res: Response) => {
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized - No user information",
      });
    }
    const userId = req.user.userId;
    const goal = await service.completeGoal(userId);
    res.json(goal);
  };

  // Delete Goal
  delete = async (req: Request<{ id: string }>, res: Response) => {
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized - No user information",
      });
    }
    const userId = req.user.userId;
    const { id } = req.params;
    await service.deleteGoal(userId, id);
    res.json({ message: "Goal deleted" });
  };
}