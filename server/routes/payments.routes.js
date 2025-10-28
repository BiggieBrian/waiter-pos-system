import express from "express";
import {
  getDailySales
} from "../controllers/payments.controller.js";

const router = express.Router();

router.get("/today", getDailySales)

export default router;
