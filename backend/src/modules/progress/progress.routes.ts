import { Router } from "express";
import { ProgressController } from "./progress.controller";


const router = Router();
const controller = new ProgressController();


router.get("/summary", controller.summary.bind(controller));

export default router;
