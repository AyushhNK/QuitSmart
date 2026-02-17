import { Router } from "express";
import { ProgressController } from "./progress.controller";
import authenticate from "../../middleware/auth.middleware";


const router = Router();
router.use(authenticate);

const controller = new ProgressController();


router.get("/summary", controller.summary.bind(controller));

export default router;
