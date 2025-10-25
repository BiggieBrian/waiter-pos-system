import express from "express";
import {
  createSession,
  closeSession,
  getActiveSessions,
  getSessionById,
  getDailyActiveSessions
} from "../controllers/session.controller.js";

const router = express.Router();

// Create a session
router.post("/:tableId", createSession);

// Close a session
router.put("/:id/close", closeSession);

// Get active sessions
router.get("/active", getActiveSessions);

router.get("/:sessionId", getSessionById);

router.get("/today", getDailyActiveSessions)

export default router;
