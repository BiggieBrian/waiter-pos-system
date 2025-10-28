import mongoose from "mongoose";

import { MenuItem } from "../models/MenuItem.js";

export const getMenuItems = async (req, res) => {
  try {
    const items = await MenuItem.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

export const getMenuItemById = async (req, res) => {
  try {
    const item = await MenuItem.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Menu item not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

export const createMenuItem = async (req, res) => {
  try {
    const { name, category, description, price, inStock, imageUrl, stockQty } =
      req.body;

    const newItem = new MenuItem({
      name,
      category,
      description,
      price,
      inStock,
      imageUrl,
      stockQty,
    });

    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(400).json({ message: "Invalid Data", error: err.message });
  }
};

export const updateMenuItem = async (req, res) => {
  try {
    const item = await MenuItem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!item) return res.status(404).json({ message: "Menu item not found" });

    res.json(item);
  } catch (err) {
    res.status(400).json({ message: "Update failed", error: err.message });
  }
};

export const deleteMenuItem = async (req, res) => {
  try {
    const item = await MenuItem.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: "Menu item not found" });

    res.json({ message: "Menu item deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed", error: err.message });
  }
};

