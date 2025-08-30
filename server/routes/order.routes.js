import express from "express";
import {
  createOrder,
  getOrdersBySession,
  updateOrderStatus,
} from "../controllers/order.controller.js";

const router = express.Router();

// Create an order
router.post("/", createOrder);

// Get orders by session
router.get("/session/:sessionId", getOrdersBySession);

// Update order status
router.put("/:id/status", updateOrderStatus);

export default router;
