import express from "express";
import {
  createSession,
  closeSession,
  getActiveSessions,
  getSessionById,
  getDailyActiveSessions
} from "../controllers/session.controller.js";

const router = express.Router();

router.get("/today", getDailyActiveSessions)
router.get("/active", getActiveSessions);
router.post("/:tableId", createSession);
router.put("/:id/close", closeSession);
router.get("/:sessionId", getSessionById);



export default router;
