import { Router } from "express";
import authMiddleware from "../../middlewares/auth.middleware";
import { getProjects } from "./project.controller";

const router = Router();

router.get("/", authMiddleware, getProjects);

export default router;
