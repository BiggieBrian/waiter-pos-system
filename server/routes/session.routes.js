import express from "express";
import {
  createSession,
  closeSession,
  getActiveSessions,
} from "../controllers/session.controller.js";

const router = express.Router();

// Create a session
router.post("/", createSession);

// Close a session
router.put("/:id/close", closeSession);

// Get active sessions
router.get("/active", getActiveSessions);

export default router;
