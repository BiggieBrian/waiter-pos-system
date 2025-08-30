import { Table } from "../models/Table.js";
import QRCode from "qrcode";

// Create single table
export const createTable = async (req, res) => {
  try {
    const { number } = req.body;

    const existingTable = await Table.findOne({ number });
    if (existingTable) {
      return res
        .status(400)
        .json({ message: `Table ${number} already exists` });
    }

    const qrData = `https://localhost:5000/table/${number}`;
    const qrCode = await QRCode.toDataURL(qrData);

    const table = new Table({ number, qrCode });
    const savedTable = await table.save();

    res.status(201).json(savedTable);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Bulk create tables
export const createMultipleTables = async (req, res) => {
  try {
    const { start, end } = req.body;

    if (!start || !end || start > end) {
      return res.status(400).json({ message: "Invalid range of tables" });
    }

    const createdTables = [];

    for (let number = start; number <= end; number++) {
      const existing = await Table.findOne({ number });
      if (existing) continue;

      const qrData = `https://localhost:5000/table/${number}`;
      const qrCode = await QRCode.toDataURL(qrData);

      const table = new Table({ number, qrCode });
      await table.save();
      createdTables.push(table);
    }

    if (createdTables.length === 0) {
      return res
        .status(400)
        .json({ message: "No new tables created (maybe all exist already)" });
    }

    res.status(201).json({
      message: `${createdTables.length} tables created successfully`,
      tables: createdTables,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all tables
export const getTables = async (req, res) => {
  try {
    const tables = await Table.find();
    res.json(tables);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get table by ID
export const getTableById = async (req, res) => {
  try {
    const table = await Table.findById(req.params.id);
    if (!table) return res.status(404).json({ message: "Table not found" });
    res.json(table);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete table
export const deleteTable = async (req, res) => {
  try {
    const table = await Table.findByIdAndDelete(req.params.id);
    if (!table) return res.status(404).json({ message: "Table not found" });
    res.json({ message: "Table deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
