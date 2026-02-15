import mongoose from "mongoose";
import { GoalModel } from "./goals.models";
import { CreateGoalInput } from "./goals.types";

export class GoalsRepository {

  async create(userId: string, data: CreateGoalInput) {
    return GoalModel.create({
      userId: new mongoose.Types.ObjectId(userId),
      ...data,
    });
  }

  async findActiveGoal(userId: string) {
    return GoalModel.findOne({ userId, isCompleted: false });
  }

  async completeGoal(userId: string) {
    return GoalModel.findOneAndUpdate(
      { userId, isCompleted: false },
      { isCompleted: true },
      { new: true }
    );
  }

  async deleteGoal(userId: string, goalId: string) {
    return GoalModel.findOneAndDelete({ _id: goalId, userId });
  }
}
