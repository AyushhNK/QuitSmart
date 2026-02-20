import { Router } from "express";
import { GoalsController } from "./goals.controller";
import authenticate from "../../middleware/auth.middleware";
import { catchErrors } from "../../utils/catchError";


const router = Router();
const controller = new GoalsController();

router.use(authenticate);


router.post("/", catchErrors(controller.create));
router.get("/active", catchErrors(controller.getActive));
router.patch("/complete", catchErrors(controller.complete));
router.delete("/:id", catchErrors(controller.delete));

export default router;
