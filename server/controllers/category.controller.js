import mongoose from "mongoose";
import { Category } from "../models/Category.js";

export const addCategory = async (req, res) => {
  try{
    const {category} = req.body;
    const newCategory = new Category({
      name: category,
    });

    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (err) {
    res.status(500).json({ message: "Adding Category failed", error: err.message });
  }
}

export const getAllCategories = async (req, res) => {
  try{
    const categories = await Category.find()
    res.status(201).json(categories)
  } catch (err) {
    res.status(500).json({ message: "Unable to fetch categories", error: err.message });
  }
}