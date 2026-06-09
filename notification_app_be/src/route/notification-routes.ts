import { Router } from "express";
import { getAllNotifications, getPriorityInbox } from "../controller/notification-controller";

const router = Router();

router.get("/", getAllNotifications);
router.get("/priority", getPriorityInbox);

export default router;
