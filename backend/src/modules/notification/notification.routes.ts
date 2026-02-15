import { Router } from "express";
import { NotificationController } from "./notification.controller";


const router = Router();
const controller = new NotificationController();


router.get("/", controller.getAll.bind(controller));
router.patch("/:id/read", controller.markAsRead.bind(controller));
router.patch("/read-all", controller.markAll.bind(controller));
router.delete("/:id", controller.delete.bind(controller));

export default router;
