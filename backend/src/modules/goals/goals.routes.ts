import { Router } from "express";
import { GoalsController } from "./goals.controller";

const router = Router();
const controller = new GoalsController();



router.post("/", controller.create.bind(controller));
router.get("/active", controller.getActive.bind(controller));
router.patch("/complete", controller.complete.bind(controller));
router.delete("/:id", controller.delete.bind(controller));

export default router;
