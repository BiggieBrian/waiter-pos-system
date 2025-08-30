import express from "express";
import {
  createTable,
  createMultipleTables,
  getTables,
  getTableById,
  deleteTable,
} from "../controllers/tables.controller.js";

const router = express.Router();

router.post("/", createTable); // Create single table
router.post("/bulk", createMultipleTables); // ✅ Create multiple tables
router.get("/", getTables);
router.get("/:id", getTableById);
router.delete("/:id", deleteTable);

export default router;
