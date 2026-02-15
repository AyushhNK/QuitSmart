import { GoalsRepository } from "./goals.repository";
import { CreateGoalInput } from "./goals.types";

export class GoalsService {

  private repo = new GoalsRepository();

  async createGoal(userId: string, data: CreateGoalInput) {

    const existingGoal = await this.repo.findActiveGoal(userId);
    if (existingGoal) {
      throw new Error("User already has an active goal");
    }

    if (data.type === "gradual" && data.targetPerDay === undefined) {
      throw new Error("Gradual goal requires targetPerDay");
    }

    if (data.targetQuitDate <= new Date()) {
      throw new Error("Target quit date must be in the future");
    }

    return this.repo.create(userId, data);
  }

  async getActiveGoal(userId: string) {
    return this.repo.findActiveGoal(userId);
  }

  async completeGoal(userId: string) {
    const goal = await this.repo.completeGoal(userId);
    if (!goal) throw new Error("No active goal found");
    return goal;
  }

  async deleteGoal(userId: string, goalId: string) {
    const deleted = await this.repo.deleteGoal(userId, goalId);
    if (!deleted) throw new Error("Goal not found");
    return deleted;
  }
}
    