import { Router } from "express";
import { TrackerController } from "./tracker.controller";
import authenticate from "../../middleware/auth.middleware";

const router = Router();
const controller = new TrackerController();

router.use(authenticate);

router.post("/", controller.create.bind(controller));
router.get("/history", controller.history.bind(controller));
router.get("/today-count", controller.todayCount.bind(controller));
router.delete("/:id", controller.delete.bind(controller));

export default router;
