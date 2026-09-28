import { Router } from "express";
import authMiddleware from "../../middlewares/auth.middleware";
import requireRole from "../../middlewares/role.middleware";
import { assignRole } from "./user.controller";

const router = Router();

router.patch("/:id/role", authMiddleware, requireRole("ADMIN"), assignRole);

export default router;
