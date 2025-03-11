import express from "express";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";
import { getStatus } from "../controller/status.controller.js";

const router = express.Router();
router.get("/", protectRoute, requireAdmin, getStatus);

export default router;